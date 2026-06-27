/**
 * client.ts — Cliente HTTP base para el backend NestJS
 *
 * [PENDIENTE] Implementar cuando el backend esté listo.
 * Configurar VITE_API_BASE_URL en .env.local y cambiar USE_MOCK_DATA a false.
 */

// BASE_URL vacío → same-origin (Vite proxy en dev reenvía /catalog, /recognize, etc.)
// En producción configurar VITE_API_BASE_URL a la URL de Cloud Run.
const BASE_URL = (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? ''

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  if (!response.ok) {
    throw new ApiError(response.status, `API Error ${response.status}: ${path}`)
  }

  return response.json() as Promise<T>
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}
