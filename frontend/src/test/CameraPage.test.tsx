/**
 * CameraPage.test.tsx
 * Tests para la pantalla unificada de cámara/análisis de imágenes.
 *
 * Estrategia de mock:
 *  - useLanguage → idioma 'es' fijo
 *  - useCamera   → mock completo del hook (no llama getUserMedia real)
 *  - useImageAnalysis → mock del hook
 *  - react-router-dom → useNavigate mockeado
 *  - FileReader + Image + canvas → stubs síncronos (jsdom no soporta media)
 *  - MemoryRouter envuelve cada render
 */
import { describe, it, expect, vi, beforeEach, afterEach, type MockedFunction } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CameraPage from '@/pages/CameraPage'
import type { UseCameraReturn } from '@/hooks/useCamera'
import type { UseImageAnalysisReturn } from '@/hooks/useImageAnalysis'

// ── Mocks de módulos ────────────────────────────────────────────────────────

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...original,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: { code: 'es', nombre: 'Español', nombreEs: 'Español', bandera: '🇪🇸' },
    setLanguage: vi.fn(),
    t: (key: string) => key,
    dir: 'ltr',
  }),
}))

vi.mock('@/hooks/useCamera')
vi.mock('@/hooks/useImageAnalysis')

// ── Helpers ─────────────────────────────────────────────────────────────────

import { useCamera } from '@/hooks/useCamera'
import { useImageAnalysis } from '@/hooks/useImageAnalysis'

const mockUseCamera = useCamera as MockedFunction<typeof useCamera>
const mockUseImageAnalysis = useImageAnalysis as MockedFunction<typeof useImageAnalysis>

function makeCameraMock(overrides: Partial<UseCameraReturn> = {}): UseCameraReturn {
  return {
    videoRef: { current: null },
    canvasRef: { current: null },
    isActive: false,
    startCamera: vi.fn().mockResolvedValue(undefined),
    stopCamera: vi.fn(),
    capturePhoto: vi.fn().mockReturnValue(null),
    permissionDenied: false,
    error: null,
    ...overrides,
  }
}

function makeAnalysisMock(overrides: Partial<UseImageAnalysisReturn> = {}): UseImageAnalysisReturn {
  return {
    analyze: vi.fn().mockResolvedValue({
      site: {
        id: 'tiwanaku',
        tipo: 'sitio' as const,
        categoria: 'sitio_turistico' as const,
        nombre: 'Tiwanaku',
        departamento: 'La Paz' as const,
        descripcionBaseEs: 'Sitio arqueológico precolombino',
        descripcionCorta: 'Ciudad ancestral',
        imagenUrl: 'https://example.com/tiwanaku.jpg',
        etiquetas: ['patrimonio', 'arqueologia'],
        destacado: true,
      },
      explicacion: 'Estás frente a Tiwanaku...',
      idioma: 'es',
      audioUrl: null,
      confianza: 0.82,
    }),
    isLoading: false,
    error: null,
    reset: vi.fn(),
    ...overrides,
  }
}

/**
 * Simula una carga de archivo disparando el evento change en el input oculto.
 * Usa una clase mock de FileReader que llama a onload síncronamente.
 * También stub Image + canvas.toDataURL para que compressImage resuelva inmediatamente.
 */
function simulateFileUpload(
  input: HTMLElement,
  file: File,
  base64Result = 'data:image/jpeg;base64,abc123'
) {
  // ── FileReader mock ──────────────────────────────────────────────────────
  class MockFileReader {
    onload: ((e: ProgressEvent<FileReader>) => void) | null = null
    result: string | null = null
    readAsDataURL(_: Blob) {
      this.result = base64Result
      if (this.onload) {
        this.onload({
          target: { result: base64Result } as unknown as FileReader,
        } as unknown as ProgressEvent<FileReader>)
      }
    }
  }
  vi.stubGlobal('FileReader', MockFileReader)

  // ── Image mock — dispara onload de forma síncrona ────────────────────────
  class MockImage {
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    width = 800
    height = 600
    set src(_: string) {
      // Llamar onload en el siguiente microtask para no romper el ciclo de React
      Promise.resolve().then(() => this.onload?.())
    }
  }
  vi.stubGlobal('Image', MockImage)

  // ── canvas.toDataURL mock ────────────────────────────────────────────────
  const origCreate = document.createElement.bind(document)
  vi.spyOn(document, 'createElement').mockImplementation((tag: string, ...args) => {
    if (tag === 'canvas') {
      const el = origCreate('canvas', ...args) as HTMLCanvasElement
      el.getContext = (() => ({ drawImage: vi.fn() })) as unknown as typeof el.getContext
      el.toDataURL = () => base64Result
      return el
    }
    return origCreate(tag, ...args)
  })

  Object.defineProperty(input, 'files', { value: [file], configurable: true })
  fireEvent.change(input)
}

function renderCameraPage() {
  return render(
    <MemoryRouter>
      <CameraPage />
    </MemoryRouter>
  )
}

// ── Setup / Teardown ─────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks()
  mockUseCamera.mockReturnValue(makeCameraMock())
  mockUseImageAnalysis.mockReturnValue(makeAnalysisMock())
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

// ── Tests ───────────────────────────────────────────────────────────────────

describe('CameraPage', () => {
  it('muestra las dos opciones iniciales: tomar foto y subir imagen', () => {
    renderCameraPage()

    expect(screen.getByText('Tomar foto')).toBeInTheDocument()
    expect(screen.getByText('Subir imagen')).toBeInTheDocument()
    expect(screen.getByText('Identificar cultura boliviana')).toBeInTheDocument()
  })

  it('muestra el visor de cámara al pulsar "Tomar foto"', async () => {
    const startCamera = vi.fn().mockResolvedValue(undefined)
    mockUseCamera.mockReturnValue(makeCameraMock({ startCamera, isActive: true }))

    renderCameraPage()

    await userEvent.click(screen.getByText('Tomar foto'))

    expect(startCamera).toHaveBeenCalledOnce()
    // En modo cámara aparece el botón de captura
    expect(screen.getByRole('button', { name: /tomar foto/i })).toBeInTheDocument()
  })

  it('acepta archivos de imagen válidos (jpg, png, webp)', async () => {
    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.jpg', { type: 'image/jpeg' })

    await act(async () => {
      simulateFileUpload(input, file)
    })

    // Sin error de validación → pasa a modo preview sin alert
    expect(screen.queryByRole('alert')).toBeNull()
    // El botón de analizar aparece en modo preview
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /analizar imagen/i })).toBeInTheDocument()
    })
  })

  it('rechaza archivos de imagen inválidos con mensaje de error', async () => {
    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['data'], 'documento.pdf', { type: 'application/pdf' })

    await act(async () => {
      Object.defineProperty(input, 'files', { value: [file], configurable: true })
      fireEvent.change(input)
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/formato no válido/i)).toBeInTheDocument()
  })

  it('rechaza imágenes mayores a 10MB con mensaje de error', async () => {
    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const bigContent = new Uint8Array(11 * 1024 * 1024)
    const file = new File([bigContent], 'enorme.png', { type: 'image/png' })

    await act(async () => {
      Object.defineProperty(input, 'files', { value: [file], configurable: true })
      fireEvent.change(input)
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/muy grande/i)).toBeInTheDocument()
  })

  it('muestra preview de la imagen después de cargar un archivo', async () => {
    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.png', { type: 'image/png' })

    await act(async () => {
      simulateFileUpload(input, file, 'data:image/png;base64,abc123')
    })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /analizar imagen/i })).toBeInTheDocument()
    })
    expect(screen.getByAltText(/vista previa de la imagen a analizar/i)).toBeInTheDocument()
  })

  it('muestra estado de carga durante el análisis', async () => {
    mockUseImageAnalysis.mockReturnValue(
      makeAnalysisMock({
        isLoading: true,
        analyze: vi.fn().mockReturnValue(new Promise(() => {})),
      })
    )

    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.jpg', { type: 'image/jpeg' })

    await act(async () => {
      simulateFileUpload(input, file)
    })

    await waitFor(() => {
      const analyzeBtn = screen.getByRole('button', { name: /analizar imagen/i })
      expect(analyzeBtn).toHaveAttribute('aria-busy', 'true')
    })
  })

  it('navega a /camara/result con los datos al completar el análisis', async () => {
    const analyzeResult = {
      site: {
        id: 'tiwanaku',
        tipo: 'sitio' as const,
        categoria: 'sitio_turistico' as const,
        nombre: 'Tiwanaku',
        departamento: 'La Paz' as const,
        descripcionBaseEs: 'Sitio arqueológico',
        descripcionCorta: 'Ciudad ancestral',
        imagenUrl: 'https://example.com/tiwanaku.jpg',
        etiquetas: [],
        destacado: true,
      },
      explicacion: 'Estás frente a Tiwanaku...',
      idioma: 'es',
      audioUrl: null,
      confianza: 0.82,
    }

    const analyzeMock = vi.fn().mockResolvedValue(analyzeResult)
    mockUseImageAnalysis.mockReturnValue(makeAnalysisMock({ analyze: analyzeMock }))

    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.jpg', { type: 'image/jpeg' })

    await act(async () => {
      simulateFileUpload(input, file)
    })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /analizar imagen/i })).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /analizar imagen/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/camara/result',
        expect.objectContaining({ state: expect.objectContaining({ result: analyzeResult }) })
      )
    })
  })

  it('navega a /camara/not-found cuando la confianza es baja', async () => {
    const lowConfidenceResult = {
      site: null,
      explicacion: 'No se identificó el sitio',
      idioma: 'es',
      audioUrl: null,
      confianza: 0.3,
    }

    mockUseImageAnalysis.mockReturnValue(
      makeAnalysisMock({ analyze: vi.fn().mockResolvedValue(lowConfidenceResult) })
    )

    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.jpg', { type: 'image/jpeg' })

    await act(async () => {
      simulateFileUpload(input, file)
    })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /analizar imagen/i })).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /analizar imagen/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/camara/not-found', expect.anything())
    })
  })

  it('muestra mensaje de error si el backend falla', async () => {
    const errorMsg = 'Sin conexión. Verificá tu internet e intentá de nuevo.'

    // Pre-configurar con error ya seteado (simula estado post-fallo)
    mockUseImageAnalysis.mockReturnValue(
      makeAnalysisMock({
        analyze: vi.fn().mockRejectedValue(new Error(errorMsg)),
        error: errorMsg,
      })
    )

    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.jpg', { type: 'image/jpeg' })

    await act(async () => {
      simulateFileUpload(input, file)
    })

    // En modo preview con error pre-seteado, el alert aparece directamente
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(errorMsg)).toBeInTheDocument()
    })
  })

  it('permite reintentar después de un error', async () => {
    const resetMock = vi.fn()
    const errorMsg = 'No se pudo analizar la imagen. Intentá de nuevo.'

    mockUseImageAnalysis.mockReturnValue(
      makeAnalysisMock({
        analyze: vi.fn().mockRejectedValue(new Error(errorMsg)),
        error: errorMsg,
        reset: resetMock,
      })
    )

    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.jpg', { type: 'image/jpeg' })

    await act(async () => {
      simulateFileUpload(input, file)
    })

    // Esperar que aparezca el alert con botón Reintentar
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    const retryBtn = screen.getByRole('button', { name: /reintentar/i })
    expect(retryBtn).toBeInTheDocument()

    await userEvent.click(retryBtn)

    expect(resetMock).toHaveBeenCalled()
  })

  it('muestra mensaje de permiso denegado cuando la cámara no está disponible', async () => {
    const errorMsg = 'Necesitamos acceso a la cámara. Actívalo en la configuración del navegador.'
    mockUseCamera.mockReturnValue(
      makeCameraMock({
        permissionDenied: true,
        error: errorMsg,
        isActive: false,
        startCamera: vi.fn().mockResolvedValue(undefined),
      })
    )

    renderCameraPage()

    await userEvent.click(screen.getByText('Tomar foto'))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(errorMsg)).toBeInTheDocument()
    })

    // El botón alternativo "Subir imagen" aparece (para permiso denegado)
    expect(screen.getByRole('button', { name: /subir imagen/i })).toBeInTheDocument()
  })

  it('muestra las categorías detectables en modo preview', async () => {
    renderCameraPage()

    const input = screen.getByTestId('file-input')
    const file = new File(['pixel'], 'foto.jpg', { type: 'image/jpeg' })

    await act(async () => {
      simulateFileUpload(input, file)
    })

    await waitFor(() => {
      expect(screen.getByText(/sitios turísticos/i)).toBeInTheDocument()
      expect(screen.getByText(/gastronomía y bebidas/i)).toBeInTheDocument()
      expect(screen.getByText(/danzas y folklore/i)).toBeInTheDocument()
      expect(screen.getByText(/tradiciones y festividades/i)).toBeInTheDocument()
    })
  })
})
