import { test, expect } from '@playwright/test';
import type { Site } from '../src/catalog/site.interface';

test.describe('CatalogModule', () => {
  test.describe('GET /catalog/sites', () => {
    test('devuelve el catalogo completo', async ({ request }) => {
      const res = await request.get('/catalog/sites');
      expect(res.status()).toBe(200);
      const body = (await res.json()) as Site[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThanOrEqual(12);
    });

    test('cada sitio tiene los campos obligatorios', async ({ request }) => {
      const res = await request.get('/catalog/sites');
      const body = (await res.json()) as Site[];
      for (const site of body) {
        expect(site).toHaveProperty('id');
        expect(site).toHaveProperty('tipo');
        expect(site).toHaveProperty('categoria');
        expect(site).toHaveProperty('nombre');
        expect(site).toHaveProperty('departamento');
        expect(site).toHaveProperty('descripcionBaseEs');
        expect(site).toHaveProperty('descripcionCorta');
        expect(site).toHaveProperty('imagenUrl');
        expect(site).toHaveProperty('etiquetas');
        expect(Array.isArray(site.etiquetas)).toBe(true);
      }
    });

    test('filtra por departamento', async ({ request }) => {
      const res = await request.get('/catalog/sites?departamento=Oruro');
      expect(res.status()).toBe(200);
      const body = (await res.json()) as Site[];
      expect(body.length).toBeGreaterThan(0);
      for (const site of body) {
        expect(site.departamento.toLowerCase()).toBe('oruro');
      }
    });

    test('filtra por categoria', async ({ request }) => {
      const res = await request.get('/catalog/sites?categoria=danza');
      expect(res.status()).toBe(200);
      const body = (await res.json()) as Site[];
      expect(body.length).toBeGreaterThan(0);
      for (const site of body) {
        expect(site.categoria).toBe('danza');
      }
    });

    test('busqueda por texto', async ({ request }) => {
      const res = await request.get('/catalog/sites?busqueda=sal');
      expect(res.status()).toBe(200);
      const body = (await res.json()) as Site[];
      expect(body.length).toBeGreaterThan(0);
    });

    test('devuelve array vacio si no hay resultados', async ({ request }) => {
      const res = await request.get(
        '/catalog/sites?departamento=Beni&categoria=danza',
      );
      expect(res.status()).toBe(200);
      const body = (await res.json()) as Site[];
      expect(Array.isArray(body)).toBe(true);
    });
  });

  test.describe('GET /catalog/sites/:id', () => {
    test('devuelve el sitio correcto por id', async ({ request }) => {
      const res = await request.get('/catalog/sites/tiwanaku');
      expect(res.status()).toBe(200);
      const body = (await res.json()) as Site;
      expect(body.id).toBe('tiwanaku');
      expect(body.nombre).toBe('Tiwanaku');
    });

    test('devuelve 404 si el id no existe', async ({ request }) => {
      const res = await request.get('/catalog/sites/no-existe-123');
      expect(res.status()).toBe(404);
    });

    test('la respuesta 404 tiene formato de error estandar', async ({
      request,
    }) => {
      const res = await request.get('/catalog/sites/xyz');
      const body = (await res.json()) as {
        statusCode: number;
        message: unknown;
      };
      expect(body.statusCode).toBe(404);
      expect(body.message).toBeDefined();
    });
  });
});
