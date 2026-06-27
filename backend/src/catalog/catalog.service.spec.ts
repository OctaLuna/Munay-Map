import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import * as fs from 'fs';
import * as path from 'path';

// Mock de fs para no depender del archivo real en los tests unitarios
jest.mock('fs');
jest.mock('path');

const MOCK_SITES = [
  {
    id: 'tiwanaku',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Tiwanaku',
    departamento: 'La Paz',
    descripcionBaseEs: 'Centro ceremonial prehispanico.',
    descripcionCorta: 'Patrimonio de la Humanidad UNESCO.',
    imagenUrl: 'https://example.com/tiwanaku.jpg',
    etiquetas: ['arqueologia', 'historia', 'cultura', 'patrimonio_unesco', 'altiplano'],
    destacado: true,
  },
  {
    id: 'salar-uyuni',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Salar de Uyuni',
    departamento: 'Potosi',
    descripcionBaseEs: 'El mayor desierto de sal del mundo.',
    descripcionCorta: 'Espejo natural mas grande del planeta.',
    imagenUrl: 'https://example.com/salar.jpg',
    etiquetas: ['naturaleza', 'paisaje', 'fotografia', 'altiplano', 'aventura', 'unico_en_el_mundo'],
    destacado: true,
  },
  {
    id: 'chuño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Chuño',
    departamento: 'La Paz',
    descripcionBaseEs: 'Papa deshidratada andina.',
    descripcionCorta: 'Tecnica milenaria andina.',
    imagenUrl: 'https://example.com/chuño.jpg',
    etiquetas: ['gastronomia', 'tradicion', 'cocina_andina', 'altiplano'],
    destacado: false,
  },
  {
    id: 'morenada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza',
    nombre: 'Morenada',
    departamento: 'Oruro',
    descripcionBaseEs: 'Danza emblematica del Carnaval de Oruro.',
    descripcionCorta: 'Patrimonio UNESCO.',
    imagenUrl: 'https://example.com/morenada.jpg',
    etiquetas: ['danza', 'folklore', 'carnaval', 'patrimonio_unesco', 'festividad'],
    destacado: true,
  },
];

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(async () => {
    // Mock de fs.readFileSync para devolver los sitios de prueba
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(MOCK_SITES));
    (path.join as jest.Mock).mockReturnValue('/mock/data/sites.json');

    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogService],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('devuelve todos los sitios sin filtros', () => {
      const result = service.findAll({});
      expect(result).toHaveLength(4);
    });

    it('filtra por departamento (case-insensitive)', () => {
      const result = service.findAll({ departamento: 'La Paz' });
      expect(result).toHaveLength(2);
      result.forEach((s) => expect(s.departamento.toLowerCase()).toBe('la paz'));
    });

    it('filtra por categoria', () => {
      const result = service.findAll({ categoria: 'gastronomia' });
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('chuño');
    });

    it('filtra por busqueda de texto (nombre)', () => {
      const result = service.findAll({ busqueda: 'tiwanaku' });
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('tiwanaku');
    });

    it('busqueda es case-insensitive y normaliza acentos', () => {
      const result = service.findAll({ busqueda: 'arqueologia' });
      expect(result.length).toBeGreaterThan(0);
    });

    it('devuelve array vacio si no hay coincidencias', () => {
      const result = service.findAll({ busqueda: 'xyz_no_existe_123' });
      expect(result).toHaveLength(0);
    });

    it('combina filtros de departamento y categoria', () => {
      const result = service.findAll({ departamento: 'Oruro', categoria: 'danza' });
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('morenada');
    });
  });

  describe('findById', () => {
    it('devuelve el sitio correcto por ID', () => {
      const site = service.findById('tiwanaku');
      expect(site.id).toBe('tiwanaku');
      expect(site.nombre).toBe('Tiwanaku');
    });

    it('lanza NotFoundException si el ID no existe', () => {
      expect(() => service.findById('no-existe')).toThrow(NotFoundException);
    });
  });

  describe('findByEtiquetas', () => {
    it('devuelve sitios ordenados por score de etiquetas', () => {
      const result = service.findByEtiquetas(['arqueologia', 'altiplano', 'historia']);
      // Tiwanaku tiene arqueologia + altiplano + historia → score 3
      expect(result[0]!.id).toBe('tiwanaku');
    });

    it('devuelve array vacio si etiquetas es array vacio', () => {
      const result = service.findByEtiquetas([]);
      expect(result).toHaveLength(0);
    });

    it('excluye sitios sin ninguna etiqueta coincidente', () => {
      const result = service.findByEtiquetas(['etiqueta_que_nadie_tiene']);
      expect(result).toHaveLength(0);
    });
  });

  describe('findByLandmark', () => {
    it('encuentra el sitio por nombre de landmark (parcial)', () => {
      const site = service.findByLandmark('Tiwanaku');
      expect(site).toBeDefined();
      expect(site!.id).toBe('tiwanaku');
    });

    it('devuelve undefined si el landmark no coincide con ningun sitio', () => {
      const site = service.findByLandmark('Torre Eiffel');
      expect(site).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('devuelve todos los sitios sin modificar', () => {
      const all = service.getAll();
      expect(all).toHaveLength(4);
    });
  });
});
