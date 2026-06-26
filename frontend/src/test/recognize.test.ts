import { describe, it, expect } from 'vitest'
import { recognizeImage } from '@/services/mock/recognize'

describe('recognizeImage (mock)', () => {
  it('devuelve un sitio con confianza alta para una imagen válida', async () => {
    const result = await recognizeImage({
      imageBase64: 'base64fakedata',
      idioma: 'es',
    })

    expect(result.site).not.toBeNull()
    expect(result.confianza).toBeGreaterThan(0.5)
    expect(result.explicacion.length).toBeGreaterThan(0)
    expect(result.idioma).toBe('es')
  })

  it('devuelve la explicación en el idioma solicitado (japonés)', async () => {
    const result = await recognizeImage({
      imageBase64: 'base64fakedata',
      idioma: 'ja',
    })

    expect(result.idioma).toBe('ja')
    expect(result.explicacion.length).toBeGreaterThan(0)
    // El texto en japonés debe contener caracteres japoneses
    expect(result.explicacion).toMatch(/[\u3040-\u30ff\u4e00-\u9fff]/)
  })

  it('devuelve audioUrl como null en modo mock', async () => {
    const result = await recognizeImage({
      imageBase64: 'base64fakedata',
      idioma: 'en',
    })

    expect(result.audioUrl).toBeNull()
  })
})
