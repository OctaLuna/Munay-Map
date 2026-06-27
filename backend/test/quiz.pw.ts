import { test, expect } from '@playwright/test';
import type { QuizQuestion } from '../src/quiz/quiz.interface';
import type { QuizRecommendation } from '../src/quiz/quiz.service';
import type { Site } from '../src/catalog/site.interface';

test.describe('QuizModule', () => {
  test.describe('GET /quiz/questions', () => {
    test('devuelve las preguntas del quiz', async ({ request }) => {
      const res = await request.get('/quiz/questions');
      expect(res.status()).toBe(200);
      const body = (await res.json()) as QuizQuestion[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThanOrEqual(6);
    });

    test('cada pregunta tiene id, orden, pregunta y opciones', async ({
      request,
    }) => {
      const res = await request.get('/quiz/questions');
      const body = (await res.json()) as QuizQuestion[];
      for (const q of body) {
        expect(q).toHaveProperty('id');
        expect(q).toHaveProperty('orden');
        expect(q).toHaveProperty('pregunta');
        expect(q).toHaveProperty('opciones');
        expect(Array.isArray(q.opciones)).toBe(true);
        expect(q.opciones.length).toBeGreaterThanOrEqual(3);
      }
    });

    test('cada opcion tiene id, texto y etiquetas', async ({ request }) => {
      const res = await request.get('/quiz/questions');
      const body = (await res.json()) as QuizQuestion[];
      for (const q of body) {
        for (const o of q.opciones) {
          expect(o).toHaveProperty('id');
          expect(o).toHaveProperty('texto');
          expect(o).toHaveProperty('etiquetas');
          expect(Array.isArray(o.etiquetas)).toBe(true);
        }
      }
    });
  });

  test.describe('POST /quiz/recommendation', () => {
    const mockAnswers = [
      {
        questionId: 'q1',
        selectedOptionId: 'q1-a',
        etiquetas: ['altiplano', 'naturaleza', 'paisaje'],
      },
      {
        questionId: 'q2',
        selectedOptionId: 'q2-a',
        etiquetas: ['arqueologia', 'historia', 'cultura'],
      },
      {
        questionId: 'q3',
        selectedOptionId: 'q3-a',
        etiquetas: ['historia', 'cultura', 'patrimonio_unesco'],
      },
      {
        questionId: 'q4',
        selectedOptionId: 'q4-c',
        etiquetas: ['cultura', 'historia', 'patrimonio_unesco'],
      },
      {
        questionId: 'q5',
        selectedOptionId: 'q5-b',
        etiquetas: ['paisaje', 'relax', 'unico_en_el_mundo'],
      },
      {
        questionId: 'q6',
        selectedOptionId: 'q6-b',
        etiquetas: ['paisaje', 'historia', 'arqueologia'],
      },
    ];

    test('camino feliz — devuelve recomendacion con 4 secciones y tips', async ({
      request,
    }) => {
      const res = await request.post('/quiz/recommendation', {
        data: { respuestas: mockAnswers, idioma: 'es' },
      });
      expect(res.status()).toBe(200);
      const body = (await res.json()) as QuizRecommendation;

      expect(body).toHaveProperty('lugares');
      expect(body).toHaveProperty('gastronomia');
      expect(body).toHaveProperty('experiencias');
      expect(body).toHaveProperty('perfilViajero');
      expect(body).toHaveProperty('tips');

      expect(Array.isArray(body.lugares)).toBe(true);
      expect(Array.isArray(body.gastronomia)).toBe(true);
      expect(Array.isArray(body.experiencias)).toBe(true);
      expect(typeof body.perfilViajero).toBe('string');
      expect(Array.isArray(body.tips)).toBe(true);
    });

    test('tips tienen titulo y descripcion validos', async ({ request }) => {
      const res = await request.post('/quiz/recommendation', {
        data: { respuestas: mockAnswers, idioma: 'es' },
      });
      const body = (await res.json()) as QuizRecommendation;
      expect(body.tips.length).toBeGreaterThan(0);
      expect(body.tips.length).toBeLessThanOrEqual(4);
      for (const tip of body.tips) {
        expect(typeof tip.titulo).toBe('string');
        expect(tip.titulo.length).toBeGreaterThan(0);
        expect(typeof tip.descripcion).toBe('string');
        expect(tip.descripcion.length).toBeGreaterThan(0);
      }
    });

    test('perfil aventurero/arqueologico incluye Tiwanaku', async ({
      request,
    }) => {
      const res = await request.post('/quiz/recommendation', {
        data: { respuestas: mockAnswers, idioma: 'es' },
      });
      const body = (await res.json()) as QuizRecommendation;
      const lugarIds = body.lugares.map((s: Site) => s.id);
      expect(lugarIds).toContain('tiwanaku');
    });

    test('maximo 3 resultados por seccion', async ({ request }) => {
      const res = await request.post('/quiz/recommendation', {
        data: { respuestas: mockAnswers, idioma: 'es' },
      });
      const body = (await res.json()) as QuizRecommendation;
      expect(body.lugares.length).toBeLessThanOrEqual(3);
      expect(body.gastronomia.length).toBeLessThanOrEqual(3);
      expect(body.experiencias.length).toBeLessThanOrEqual(3);
    });

    test('devuelve 400 si faltan respuestas', async ({ request }) => {
      const res = await request.post('/quiz/recommendation', {
        data: { idioma: 'es' },
      });
      expect(res.status()).toBe(400);
    });

    test('devuelve 400 si respuestas es array vacio', async ({ request }) => {
      const res = await request.post('/quiz/recommendation', {
        data: { respuestas: [], idioma: 'es' },
      });
      expect(res.status()).toBe(400);
    });

    test('devuelve 400 si falta idioma', async ({ request }) => {
      const res = await request.post('/quiz/recommendation', {
        data: { respuestas: mockAnswers },
      });
      expect(res.status()).toBe(400);
    });
  });

  test.describe('POST /quiz/resultado (alias semantico)', () => {
    const mockAnswers = [
      {
        questionId: 'q1',
        selectedOptionId: 'q1-a',
        etiquetas: ['altiplano', 'naturaleza', 'paisaje'],
      },
      {
        questionId: 'q2',
        selectedOptionId: 'q2-a',
        etiquetas: ['arqueologia', 'historia', 'cultura'],
      },
      {
        questionId: 'q3',
        selectedOptionId: 'q3-a',
        etiquetas: ['historia', 'cultura', 'patrimonio_unesco'],
      },
    ];

    test('devuelve 200 con el mismo payload que /quiz/recommendation', async ({
      request,
    }) => {
      const res = await request.post('/quiz/resultado', {
        data: { respuestas: mockAnswers, idioma: 'es' },
      });
      expect(res.status()).toBe(200);
      const body = (await res.json()) as QuizRecommendation;
      expect(body).toHaveProperty('lugares');
      expect(body).toHaveProperty('gastronomia');
      expect(body).toHaveProperty('experiencias');
      expect(body).toHaveProperty('perfilViajero');
      expect(body).toHaveProperty('tips');
    });

    test('devuelve 400 si el payload es invalido', async ({ request }) => {
      const res = await request.post('/quiz/resultado', {
        data: { idioma: 'es' },
      });
      expect(res.status()).toBe(400);
    });
  });
});
