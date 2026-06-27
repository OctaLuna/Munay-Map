import { test, expect } from '@playwright/test';
import type { RecognizeResult } from '../src/recognize/recognize.service';

const MINIMAL_BASE64_JPEG =
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8U' +
  'HRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgN' +
  'DRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy' +
  'MjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAA' +
  'AAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/' +
  'aAAwDAQACEQMRAD8AJQAB/9k=';

test.describe('POST /recognize', () => {
  test('camino feliz — devuelve RecognizeResponse completo (modo mock)', async ({
    request,
  }) => {
    const res = await request.post('/recognize', {
      data: { imageBase64: MINIMAL_BASE64_JPEG, idioma: 'es' },
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as RecognizeResult;

    expect(body).toHaveProperty('site');
    expect(body).toHaveProperty('explicacion');
    expect(body).toHaveProperty('idioma');
    expect(body).toHaveProperty('audioUrl');
    expect(body).toHaveProperty('confianza');

    expect(body.idioma).toBe('es');
    expect(typeof body.explicacion).toBe('string');
    expect(body.explicacion.length).toBeGreaterThan(0);
    expect(typeof body.confianza).toBe('number');
    expect(body.confianza).toBeGreaterThanOrEqual(0);
    expect(body.confianza).toBeLessThanOrEqual(1);
  });

  test('mock detecta Tiwanaku y lo cruza con el catalogo', async ({
    request,
  }) => {
    const res = await request.post('/recognize', {
      data: { imageBase64: MINIMAL_BASE64_JPEG, idioma: 'es' },
    });
    const body = (await res.json()) as RecognizeResult;
    // El mock de Vision devuelve landmark 'Tiwanaku'
    expect(body.site).not.toBeNull();
    expect(body.site?.id).toBe('tiwanaku');
    expect(body.confianza).toBeGreaterThanOrEqual(0.8);
  });

  test('funciona con idioma ingles', async ({ request }) => {
    const res = await request.post('/recognize', {
      data: { imageBase64: MINIMAL_BASE64_JPEG, idioma: 'en' },
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as RecognizeResult;
    expect(body.idioma).toBe('en');
  });

  test('devuelve 400 si falta imageBase64', async ({ request }) => {
    const res = await request.post('/recognize', {
      data: { idioma: 'es' },
    });
    expect(res.status()).toBe(400);
  });

  test('devuelve 400 si falta idioma', async ({ request }) => {
    const res = await request.post('/recognize', {
      data: { imageBase64: MINIMAL_BASE64_JPEG },
    });
    expect(res.status()).toBe(400);
  });

  test('devuelve 400 si idioma tiene mas de 10 caracteres', async ({
    request,
  }) => {
    const res = await request.post('/recognize', {
      data: { imageBase64: MINIMAL_BASE64_JPEG, idioma: 'un-idioma-muy-largo' },
    });
    expect(res.status()).toBe(400);
  });

  test('audioUrl es string base64 de audio o null', async ({ request }) => {
    const res = await request.post('/recognize', {
      data: { imageBase64: MINIMAL_BASE64_JPEG, idioma: 'es' },
    });
    const body = (await res.json()) as RecognizeResult;
    if (body.audioUrl !== null) {
      expect(typeof body.audioUrl).toBe('string');
      expect(body.audioUrl.length).toBeGreaterThan(0);
    }
  });
});
