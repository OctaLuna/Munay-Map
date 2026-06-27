# Skill: Escribir tests de API con Playwright para Munay Map Backend

## Cuándo usar esta skill

Usar cuando necesitás escribir tests de API para el backend NestJS de Munay Map. Los tests usan el fixture `request` de Playwright (sin browser) para hacer llamadas HTTP reales al servidor.

---

## Setup

El `playwright.config.ts` en `backend/` ya está configurado:

```typescript
// backend/playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  testMatch: '**/*.pw.ts',          // Solo archivos *.pw.ts
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'npm run start:dev',
    url: 'http://localhost:3000/health',
    reuseExistingServer: true,
    timeout: 60000,
    env: {
      GOOGLE_CLOUD_MOCK_MODE: 'true',   // Siempre mock en tests
      PORT: '3000',
      CORS_ORIGIN: 'http://localhost:5173',
    },
  },
});
```

Para correr los tests:
```bash
cd backend
npm run test:pw
```

---

## Estructura de un archivo de test

```typescript
// test/<modulo>.pw.ts
import { test, expect } from '@playwright/test';
import type { MiTipo } from '../src/<modulo>/<modulo>.service';  // importar tipos del backend

test.describe('<Módulo>', () => {
  test.describe('<Agrupación>', () => {
    test('descripción del caso', async ({ request }) => {
      const res = await request.get('/endpoint');
      expect(res.status()).toBe(200);
      const body = await res.json() as MiTipo;
      // assertions...
    });
  });
});
```

---

## Patrones por tipo de endpoint

### GET sin parámetros

```typescript
test('devuelve datos', async ({ request }) => {
  const res = await request.get('/catalog/sites');
  expect(res.status()).toBe(200);
  const body = await res.json() as Site[];
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
```

### GET con query params

```typescript
test('filtra por departamento', async ({ request }) => {
  const res = await request.get('/catalog/sites?departamento=Oruro');
  expect(res.status()).toBe(200);
  const body = await res.json() as Site[];
  for (const site of body) {
    expect(site.departamento.toLowerCase()).toBe('oruro');
  }
});
```

### GET con path param → 404

```typescript
test('devuelve 404 si el id no existe', async ({ request }) => {
  const res = await request.get('/catalog/sites/no-existe');
  expect(res.status()).toBe(404);
  const body = await res.json() as { statusCode: number; message: unknown };
  expect(body.statusCode).toBe(404);
});
```

### POST — camino feliz

```typescript
test('camino feliz', async ({ request }) => {
  const res = await request.post('/recognize', {
    data: { imageBase64: MINIMAL_BASE64_JPEG, idioma: 'es' },
  });
  expect(res.status()).toBe(200);
  const body = await res.json() as RecognizeResult;
  // verificar cada campo obligatorio
  expect(body).toHaveProperty('site');
  expect(body).toHaveProperty('explicacion');
  expect(typeof body.explicacion).toBe('string');
  expect(body.explicacion.length).toBeGreaterThan(0);
});
```

### POST — validación fallida (400)

```typescript
test('devuelve 400 si falta campo obligatorio', async ({ request }) => {
  const res = await request.post('/recognize', {
    data: { idioma: 'es' },   // falta imageBase64
  });
  expect(res.status()).toBe(400);
});
```

---

## Reglas obligatorias

Para cada endpoint nuevo, escribir al menos:

1. **Camino feliz** — request válido → 200 + estructura correcta
2. **Campo ausente** — faltan campos obligatorios → 400
3. **Valor inválido** — campos con formato incorrecto → 400 o error semántico
4. **404** (si aplica) — recurso no encontrado → 404 con `statusCode` en body

No es necesario testear casos de error del servicio externo (ej. falla de Google) porque en mock mode nunca fallan.

---

## MINIMAL_BASE64_JPEG

Imagen JPEG mínima válida en base64 para tests de `/recognize`:

```typescript
const MINIMAL_BASE64_JPEG =
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8U' +
  'HRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIA' +
  'AhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/' +
  'xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMR' +
  'AD8AJQAB/9k=';
```

---

## Archivos de test existentes

| Archivo | Endpoints cubiertos | Tests |
|---|---|---|
| `test/health.pw.ts` | `GET /health` | 2 |
| `test/catalog.pw.ts` | `GET /catalog/sites`, `GET /catalog/sites/:id` | 8 |
| `test/recognize.pw.ts` | `POST /recognize` | 7 |
| `test/chat.pw.ts` | `POST /chat/ask` | 7 |
| `test/quiz.pw.ts` | `GET /quiz/questions`, `POST /quiz/recommendation` | 9 |
| `test/vision.pw.ts` | Smoke test módulo VisionModule | 1 |

Total: **35 tests — todos pasan con `GOOGLE_CLOUD_MOCK_MODE=true`**