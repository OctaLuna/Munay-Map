import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { CatalogService } from '../catalog/catalog.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

const MOCK_QUESTIONS = [
  {
    id: 'q1',
    orden: 1,
    pregunta: '¿Qué tipo de paisaje te atrae más?',
    opciones: [
      { id: 'q1-a', texto: 'Altiplano', etiquetas: ['altiplano', 'naturaleza'] },
      { id: 'q1-b', texto: 'Selva', etiquetas: ['amazonia', 'naturaleza'] },
    ],
  },
  {
    id: 'q2',
    orden: 2,
    pregunta: '¿Qué actividad preferís?',
    opciones: [
      { id: 'q2-a', texto: 'Ruinas', etiquetas: ['arqueologia', 'historia'] },
      { id: 'q2-b', texto: 'Gastronomía', etiquetas: ['gastronomia', 'cocina_andina'] },
    ],
  },
];

const MOCK_SITES = [
  {
    id: 'tiwanaku',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Tiwanaku',
    departamento: 'La Paz',
    descripcionBaseEs: 'Centro ceremonial.',
    descripcionCorta: 'Patrimonio UNESCO.',
    imagenUrl: 'https://example.com/t.jpg',
    etiquetas: ['arqueologia', 'historia', 'cultura', 'altiplano'],
  },
  {
    id: 'salar-uyuni',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Salar de Uyuni',
    departamento: 'Potosi',
    descripcionBaseEs: 'Desierto de sal.',
    descripcionCorta: 'Espejo natural.',
    imagenUrl: 'https://example.com/s.jpg',
    etiquetas: ['naturaleza', 'paisaje', 'fotografia', 'aventura', 'unico_en_el_mundo'],
  },
  {
    id: 'chuño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Chuño',
    departamento: 'La Paz',
    descripcionBaseEs: 'Papa deshidratada.',
    descripcionCorta: 'Tecnica milenaria.',
    imagenUrl: 'https://example.com/c.jpg',
    etiquetas: ['gastronomia', 'tradicion', 'cocina_andina', 'altiplano'],
  },
  {
    id: 'morenada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza',
    nombre: 'Morenada',
    departamento: 'Oruro',
    descripcionBaseEs: 'Danza del Carnaval.',
    descripcionCorta: 'Patrimonio UNESCO.',
    imagenUrl: 'https://example.com/m.jpg',
    etiquetas: ['danza', 'folklore', 'carnaval', 'festividad', 'musica'],
  },
  {
    id: 'alasitas',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Alasitas',
    departamento: 'La Paz',
    descripcionBaseEs: 'Festividad aymara.',
    descripcionCorta: 'Miniaturismo aymara.',
    imagenUrl: 'https://example.com/a.jpg',
    etiquetas: ['festividad', 'tradicion', 'cultura_aymara', 'espiritualidad'],
  },
];

describe('QuizService', () => {
  let service: QuizService;
  let catalogService: jest.Mocked<CatalogService>;

  beforeEach(async () => {
    (path.join as jest.Mock).mockReturnValue('/mock/data/quizQuestions.json');
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(MOCK_QUESTIONS),
    );

    const mockCatalogService: jest.Mocked<Partial<CatalogService>> = {
      getAll: jest.fn().mockReturnValue(MOCK_SITES),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: CatalogService,
          useValue: mockCatalogService,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    catalogService = module.get(CatalogService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getQuestions', () => {
    it('devuelve las preguntas cargadas desde el JSON', () => {
      const questions = service.getQuestions();
      expect(questions).toHaveLength(2);
      expect(questions[0]!.id).toBe('q1');
    });

    it('cada pregunta tiene id, orden, pregunta y opciones', () => {
      const questions = service.getQuestions();
      for (const q of questions) {
        expect(q).toHaveProperty('id');
        expect(q).toHaveProperty('orden');
        expect(q).toHaveProperty('pregunta');
        expect(q).toHaveProperty('opciones');
        expect(Array.isArray(q.opciones)).toBe(true);
      }
    });
  });

  describe('getRecommendation', () => {
    const arqueologoAnswers = {
      respuestas: [
        { questionId: 'q1', selectedOptionId: 'q1-a', etiquetas: ['altiplano', 'naturaleza'] },
        { questionId: 'q2', selectedOptionId: 'q2-a', etiquetas: ['arqueologia', 'historia'] },
      ],
      idioma: 'es',
    };

    const gastronomoAnswers = {
      respuestas: [
        { questionId: 'q1', selectedOptionId: 'q1-a', etiquetas: ['gastronomia', 'cocina_andina'] },
        { questionId: 'q2', selectedOptionId: 'q2-b', etiquetas: ['gastronomia', 'tradicion'] },
      ],
      idioma: 'es',
    };

    it('devuelve las 5 secciones requeridas', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      expect(result).toHaveProperty('lugares');
      expect(result).toHaveProperty('gastronomia');
      expect(result).toHaveProperty('experiencias');
      expect(result).toHaveProperty('perfilViajero');
      expect(result).toHaveProperty('tips');
    });

    it('lugares contiene solo sitios turisticos', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      result.lugares.forEach((s) => {
        expect(s.categoria).toBe('sitio_turistico');
      });
    });

    it('gastronomia contiene solo sitios de categoria gastronomia', () => {
      const result = service.getRecommendation(gastronomoAnswers);
      result.gastronomia.forEach((s) => {
        expect(s.categoria).toBe('gastronomia');
      });
    });

    it('experiencias contiene solo danzas y tradiciones', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      result.experiencias.forEach((s) => {
        expect(['danza', 'tradicion_festividad']).toContain(s.categoria);
      });
    });

    it('cada seccion tiene como maximo 3 resultados', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      expect(result.lugares.length).toBeLessThanOrEqual(3);
      expect(result.gastronomia.length).toBeLessThanOrEqual(3);
      expect(result.experiencias.length).toBeLessThanOrEqual(3);
    });

    it('perfilViajero es un string no vacio', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      expect(typeof result.perfilViajero).toBe('string');
      expect(result.perfilViajero.length).toBeGreaterThan(0);
    });

    it('tips es un array no vacio con titulo y descripcion', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      expect(Array.isArray(result.tips)).toBe(true);
      expect(result.tips.length).toBeGreaterThan(0);
      result.tips.forEach((tip) => {
        expect(tip).toHaveProperty('titulo');
        expect(tip).toHaveProperty('descripcion');
        expect(typeof tip.titulo).toBe('string');
        expect(typeof tip.descripcion).toBe('string');
      });
    });

    it('tips tiene como maximo 4 consejos', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      expect(result.tips.length).toBeLessThanOrEqual(4);
    });

    it('Tiwanaku aparece para un perfil arqueologico', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      const ids = result.lugares.map((s) => s.id);
      expect(ids).toContain('tiwanaku');
    });

    it('llama a catalogService.getAll() exactamente una vez', () => {
      service.getRecommendation(arqueologoAnswers);
      expect(catalogService.getAll).toHaveBeenCalledTimes(1);
    });

    it('genera un itinerario con días numerados y la duración coincide', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      expect(Array.isArray(result.itinerario)).toBe(true);
      expect(result.itinerario!.length).toBeGreaterThan(0);
      expect(result.duracionSugeridaDias).toBe(result.itinerario!.length);
      result.itinerario!.forEach((dia, i) => {
        expect(dia.dia).toBe(i + 1);
        expect(typeof dia.siteId).toBe('string');
        expect(dia.siteId.length).toBeGreaterThan(0);
      });
    });

    it('incluye presupuesto, mejor época e intereses en la guía', () => {
      const result = service.getRecommendation(arqueologoAnswers);
      expect(result.presupuesto).toBeDefined();
      expect(typeof result.presupuesto!.nivel).toBe('string');
      expect(typeof result.mejorEpoca).toBe('string');
      expect(Array.isArray(result.intereses)).toBe(true);
    });
  });
});
