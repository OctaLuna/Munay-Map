import { test, expect } from '@playwright/test';

// VisionModule no expone endpoints directos - se prueba a traves de /recognize
// Este archivo verifica que el servidor arranca correctamente con el modulo cargado
test('servidor arranca con VisionModule cargado (mock)', async ({
  request,
}) => {
  const res = await request.get('/health');
  expect(res.status()).toBe(200);
  const body = (await res.json()) as { mockMode: boolean };
  expect(body.mockMode).toBe(true);
});
