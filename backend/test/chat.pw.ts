import { test, expect } from '@playwright/test';
import type { AskGuideResult } from '../src/chat/chat.service';

test.describe('POST /chat/ask', () => {
  test('camino feliz — devuelve respuesta del guia', async ({ request }) => {
    const res = await request.post('/chat/ask', {
      data: { pregunta: 'Que puedo visitar en La Paz?', idioma: 'es' },
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as AskGuideResult;

    expect(body).toHaveProperty('respuesta');
    expect(body).toHaveProperty('idioma');
    expect(body).toHaveProperty('audioUrl');

    expect(typeof body.respuesta).toBe('string');
    expect(body.respuesta.length).toBeGreaterThan(0);
    expect(body.idioma).toBe('es');
  });

  test('funciona con idioma ingles', async ({ request }) => {
    const res = await request.post('/chat/ask', {
      data: { pregunta: 'What is Tiwanaku?', idioma: 'en' },
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as AskGuideResult;
    expect(body.idioma).toBe('en');
  });

  test('acepta siteId opcional', async ({ request }) => {
    const res = await request.post('/chat/ask', {
      data: {
        pregunta: 'Cuentame mas sobre este lugar',
        idioma: 'es',
        siteId: 'tiwanaku',
      },
    });
    expect(res.status()).toBe(200);
  });

  test('devuelve 400 si falta pregunta', async ({ request }) => {
    const res = await request.post('/chat/ask', {
      data: { idioma: 'es' },
    });
    expect(res.status()).toBe(400);
  });

  test('devuelve 400 si falta idioma', async ({ request }) => {
    const res = await request.post('/chat/ask', {
      data: { pregunta: 'Que visitar?' },
    });
    expect(res.status()).toBe(400);
  });

  test('devuelve 400 si idioma tiene mas de 10 caracteres', async ({
    request,
  }) => {
    const res = await request.post('/chat/ask', {
      data: { pregunta: 'Algo', idioma: 'este-idioma-es-muy-largo' },
    });
    expect(res.status()).toBe(400);
  });

  test('audioUrl es string o null', async ({ request }) => {
    const res = await request.post('/chat/ask', {
      data: { pregunta: 'Hola', idioma: 'es' },
    });
    const body = (await res.json()) as AskGuideResult;
    expect(body.audioUrl === null || typeof body.audioUrl === 'string').toBe(
      true,
    );
  });
});
