import { test, expect } from '@playwright/test';

test.describe('GET /health', () => {
  test('devuelve status ok y mockMode', async ({ request }) => {
    const res = await request.get('/health');
    expect(res.status()).toBe(200);
    const body = (await res.json()) as { status: string; mockMode: boolean };
    expect(body.status).toBe('ok');
    expect(typeof body.mockMode).toBe('boolean');
  });

  test('mockMode es true cuando GOOGLE_CLOUD_MOCK_MODE=true', async ({
    request,
  }) => {
    const res = await request.get('/health');
    const body = (await res.json()) as { mockMode: boolean };
    // El webServer arranca con GOOGLE_CLOUD_MOCK_MODE=true
    expect(body.mockMode).toBe(true);
  });
});
