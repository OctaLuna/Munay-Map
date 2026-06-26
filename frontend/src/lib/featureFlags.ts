/**
 * featureFlags.ts
 * ---------------
 * Único punto de switch entre datos mock y backend real.
 *
 * Para migrar a la API real:
 *   1. Asegurarse de que VITE_API_BASE_URL esté configurado en .env.local
 *   2. Cambiar USE_MOCK_DATA a false
 *   3. Implementar las funciones en services/api/ (siguen la misma firma que services/mock/)
 *
 * Decisión de arquitectura: usar una constante en lugar de una variable de entorno
 * para el switch permite que TypeScript elimine el código no usado en build (tree-shaking).
 */
export const USE_MOCK_DATA = true
