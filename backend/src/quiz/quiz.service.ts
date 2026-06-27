import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CatalogService } from '../catalog/catalog.service';
import type { QuizQuestion } from './quiz.interface';
import type { QuizRecommendationRequestDto } from './dto/quiz-recommendation-request.dto';
import type { Site } from '../catalog/site.interface';

export interface QuizTip {
  titulo: string;
  descripcion: string;
}

export interface QuizPresupuesto {
  nivel: string;
  rangoDiarioUsd: string;
  descripcion: string;
}

export interface ItinerarioDia {
  dia: number;
  titulo: string;
  region: string;
  siteId: string;
  nombreSitio: string;
  imagenUrl: string;
  descripcion: string;
  comida?: string;
  experiencia?: string;
  consejo?: string;
}

export interface QuizRecommendation {
  lugares: Site[];
  gastronomia: Site[];
  experiencias: Site[];
  perfilViajero: string;
  /** Consejos prácticos personalizados basados en el perfil detectado */
  tips: QuizTip[];
  // ─── Guía personalizada completa (aditivo) ──────────────────────────────
  resumenPerfil?: string;
  intereses?: string[];
  duracionSugeridaDias?: number;
  mejorEpoca?: string;
  presupuesto?: QuizPresupuesto;
  itinerario?: ItinerarioDia[];
}

/** Orden geográfico de regiones para optimizar la ruta del itinerario */
const REGION_SEQUENCE = [
  'la paz',
  'oruro',
  'cochabamba',
  'chuquisaca',
  'potosi',
  'tarija',
  'santa cruz',
  'beni',
  'pando',
];

function normalizeRegion(dep: string): string {
  return dep
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function regionIndex(dep: string): number {
  const i = REGION_SEQUENCE.indexOf(normalizeRegion(dep));
  return i === -1 ? 99 : i;
}

const DAY_THEMES: Record<string, string> = {
  arqueologia: 'Raíces milenarias',
  historia: 'Huellas del pasado',
  patrimonio_unesco: 'Patrimonio de la humanidad',
  naturaleza: 'Naturaleza en estado puro',
  paisaje: 'Paisajes de otro planeta',
  unico_en_el_mundo: 'Lo único en el mundo',
  fotografia: 'En busca de la toma perfecta',
  aventura: 'Aventura en el altiplano',
  espiritualidad: 'Conexión espiritual',
  cultura_aymara: 'Sabiduría aymara',
  festividad: 'Color y folklore',
  danza: 'Ritmo y tradición',
  folklore: 'Alma del folklore',
  gastronomia: 'Sabores de Bolivia',
  cultura: 'Inmersión cultural',
};

const DAY_TIPS: Record<string, string> = {
  altiplano:
    'Estás a gran altura: hidratate, caminá despacio y tené a mano mate de coca.',
  arqueologia:
    'Contratá un guía local certificado: el contexto histórico transforma la visita.',
  fotografia:
    'La luz del amanecer y el atardecer (hora dorada) regala las mejores tomas.',
  naturaleza:
    'Llevá protector solar, gafas y ropa en capas: el clima andino cambia rápido.',
  festividad:
    'Confirmá fechas de festividades con anticipación: definen el ambiente del día.',
  gastronomia:
    'Animate a comer en mercados locales: es barato, auténtico y delicioso.',
  espiritualidad:
    'Pedí permiso antes de fotografiar ceremonias y respetá los espacios sagrados.',
};

@Injectable()
export class QuizService {
  private readonly logger = new Logger(QuizService.name);
  private readonly questions: QuizQuestion[];

  constructor(private readonly catalogService: CatalogService) {
    const filePath = path.join(process.cwd(), 'data', 'quizQuestions.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    this.questions = JSON.parse(raw) as QuizQuestion[];
  }

  getQuestions(): QuizQuestion[] {
    return this.questions;
  }

  getRecommendation(dto: QuizRecommendationRequestDto): QuizRecommendation {
    // Collect all etiquetas from answers
    const allEtiquetas = dto.respuestas.flatMap((r) => r.etiquetas);
    const etiquetaCounts = allEtiquetas.reduce<Record<string, number>>(
      (acc, e) => {
        acc[e] = (acc[e] ?? 0) + 1;
        return acc;
      },
      {},
    );

    this.logger.log(
      `Quiz etiquetas: ${Object.keys(etiquetaCounts).join(', ')}`,
    );

    // Score all sites
    const allSites = this.catalogService.getAll();
    const scored = allSites.map((site) => ({
      site,
      score: site.etiquetas.reduce(
        (sum, e) => sum + (etiquetaCounts[e] ?? 0),
        0,
      ),
    }));

    const sorted = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    // Split into categories
    const lugares = sorted
      .filter(
        (s) =>
          s.site.tipo === 'sitio' && s.site.categoria === 'sitio_turistico',
      )
      .slice(0, 3)
      .map((s) => s.site);

    const gastronomia = sorted
      .filter((s) => s.site.categoria === 'gastronomia')
      .slice(0, 3)
      .map((s) => s.site);

    const experiencias = sorted
      .filter(
        (s) =>
          s.site.categoria === 'danza' ||
          s.site.categoria === 'tradicion_festividad',
      )
      .slice(0, 3)
      .map((s) => s.site);

    // Generate traveler profile description
    const perfilViajero = this.buildPerfilViajero(etiquetaCounts);

    // Generate practical tips
    const tips = this.buildTips(etiquetaCounts);

    // ─── Guía personalizada completa ─────────────────────────────────────
    const topTags = Object.entries(etiquetaCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([e]) => e);

    // Backbone del itinerario: los lugares mejor puntuados; si ninguno puntúa,
    // se cae a los destacados para garantizar siempre una guía con contenido.
    let backbone = lugares;
    if (backbone.length === 0) {
      backbone = allSites
        .filter(
          (s) => s.tipo === 'sitio' && s.categoria === 'sitio_turistico',
        )
        .sort((a, b) => Number(b.destacado ?? false) - Number(a.destacado ?? false))
        .slice(0, 3);
    }

    const gastroPool = sorted
      .filter((s) => s.site.categoria === 'gastronomia')
      .map((s) => s.site);
    const expPool = sorted
      .filter(
        (s) =>
          s.site.categoria === 'danza' ||
          s.site.categoria === 'tradicion_festividad',
      )
      .map((s) => s.site);

    const itinerario = this.buildItinerario(
      backbone,
      gastroPool,
      expPool,
      etiquetaCounts,
    );

    const presupuesto = this.buildPresupuesto(dto);
    const mejorEpoca = this.buildMejorEpoca(dto, etiquetaCounts);
    const resumenPerfil = this.buildResumenPerfil(topTags, itinerario.length);

    return {
      lugares,
      gastronomia,
      experiencias,
      perfilViajero,
      tips,
      resumenPerfil,
      intereses: topTags,
      duracionSugeridaDias: itinerario.length,
      mejorEpoca,
      presupuesto,
      itinerario,
    };
  }

  /** Construye un itinerario optimizado: agrupa por región y enlaza comida/experiencia. */
  private buildItinerario(
    backbone: Site[],
    gastroPool: Site[],
    expPool: Site[],
    etiquetaCounts: Record<string, number>,
  ): ItinerarioDia[] {
    // Ordena los lugares por secuencia geográfica para minimizar traslados
    const ordered = [...backbone].sort(
      (a, b) => regionIndex(a.departamento) - regionIndex(b.departamento),
    );

    const usedGastro = new Set<string>();
    const usedExp = new Set<string>();

    const pick = (pool: Site[], region: string, used: Set<string>): Site | undefined => {
      const norm = normalizeRegion(region);
      const sameRegion = pool.find(
        (s) => normalizeRegion(s.departamento) === norm && !used.has(s.id),
      );
      const chosen = sameRegion ?? pool.find((s) => !used.has(s.id)) ?? pool[0];
      if (chosen) used.add(chosen.id);
      return chosen;
    };

    return ordered.map((site, idx) => {
      const primaryTag =
        [...site.etiquetas].sort(
          (a, b) => (etiquetaCounts[b] ?? 0) - (etiquetaCounts[a] ?? 0),
        )[0] ?? '';

      const comidaSite = pick(gastroPool, site.departamento, usedGastro);
      const expSite = pick(expPool, site.departamento, usedExp);

      const dia: ItinerarioDia = {
        dia: idx + 1,
        titulo: DAY_THEMES[primaryTag] ?? 'Día de descubrimiento',
        region: site.departamento,
        siteId: site.id,
        nombreSitio: site.nombre,
        imagenUrl: site.imagenUrl,
        descripcion: site.descripcionCorta,
      };
      if (comidaSite) {
        dia.comida = `Probá ${comidaSite.nombre}: ${comidaSite.descripcionCorta}`;
      }
      if (expSite) {
        dia.experiencia = `No te pierdas ${expSite.nombre}.`;
      }
      const consejo = DAY_TIPS[primaryTag];
      if (consejo) dia.consejo = consejo;
      return dia;
    });
  }

  /** Deriva el presupuesto de la respuesta de presupuesto (q6) del quiz. */
  private buildPresupuesto(dto: QuizRecommendationRequestDto): QuizPresupuesto {
    const ans = dto.respuestas.find((r) => r.questionId === 'q6');
    const map: Record<string, QuizPresupuesto> = {
      'q6-a': {
        nivel: 'Económico',
        rangoDiarioUsd: 'Hasta $30 USD/día',
        descripcion:
          'Hostales, transporte público y comida de mercado. Bolivia es uno de los destinos más accesibles de Sudamérica.',
      },
      'q6-b': {
        nivel: 'Moderado',
        rangoDiarioUsd: '$30–$80 USD/día',
        descripcion:
          'Hoteles cómodos, tours grupales y restaurantes locales. El equilibrio ideal entre precio y experiencia.',
      },
      'q6-c': {
        nivel: 'Cómodo',
        rangoDiarioUsd: '$80–$150 USD/día',
        descripcion:
          'Hoteles boutique, tours privados y la mejor gastronomía, sin extravagancias.',
      },
      'q6-d': {
        nivel: 'Premium',
        rangoDiarioUsd: 'Más de $150 USD/día',
        descripcion:
          'Hoteles de sal de lujo, vuelos internos y guías privados certificados. La experiencia más exclusiva.',
      },
    };
    return map[ans?.selectedOptionId ?? ''] ?? map['q6-b']!;
  }

  /** Deriva la mejor época de la respuesta de temporada (q9), con respaldo por intereses. */
  private buildMejorEpoca(
    dto: QuizRecommendationRequestDto,
    etiquetaCounts: Record<string, number>,
  ): string {
    const ans = dto.respuestas.find((r) => r.questionId === 'q9');
    const map: Record<string, string> = {
      'q9-a': 'Diciembre–Marzo · temporada de lluvias, el Salar se vuelve un espejo perfecto',
      'q9-b': 'Junio–Agosto · temporada seca, cielos despejados ideales para el altiplano',
      'q9-c': 'Febrero · Carnaval de Oruro, el mayor espectáculo folclórico del país',
      'q9-d': 'Todo el año · cada temporada ofrece su propia magia',
    };
    if (ans && map[ans.selectedOptionId]) return map[ans.selectedOptionId]!;

    const has = (t: string) => (etiquetaCounts[t] ?? 0) > 0;
    if (has('carnaval') || has('festividad') || has('danza')) {
      return 'Febrero · Carnaval de Oruro, el mayor espectáculo folclórico del país';
    }
    if (has('fotografia') || has('unico_en_el_mundo')) {
      return 'Enero–Abril · el Salar de Uyuni con su famoso efecto espejo';
    }
    if (has('aventura') || has('arqueologia')) {
      return 'Mayo–Octubre · temporada seca, ideal para senderismo y altiplano';
    }
    return 'Todo el año · cada temporada ofrece su propia magia';
  }

  private buildResumenPerfil(topTags: string[], dias: number): string {
    const labels: Record<string, string> = {
      aventura: 'la aventura',
      naturaleza: 'la naturaleza',
      fotografia: 'la fotografía',
      historia: 'la historia',
      arqueologia: 'la arqueología',
      gastronomia: 'la gastronomía',
      festividad: 'las festividades',
      danza: 'el folklore',
      espiritualidad: 'la espiritualidad',
      paisaje: 'los paisajes',
      cultura: 'la cultura viva',
      altiplano: 'el altiplano',
    };
    const intereses = topTags
      .map((t) => labels[t])
      .filter(Boolean)
      .slice(0, 3);
    const lista =
      intereses.length > 1
        ? `${intereses.slice(0, -1).join(', ')} y ${intereses[intereses.length - 1]}`
        : (intereses[0] ?? 'descubrir Bolivia');
    return `Diseñamos para vos una guía de ${dias} ${dias === 1 ? 'día' : 'días'} centrada en ${lista}, optimizada para recorrer Bolivia con el menor traslado posible.`;
  }

  private buildPerfilViajero(etiquetaCounts: Record<string, number>): string {
    const topEtiquetas = Object.entries(etiquetaCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([e]) => e);

    const profileMap: Record<string, string> = {
      aventura: 'Aventurero',
      fotografia: 'Fotografo viajero',
      historia: 'Amante de la historia',
      naturaleza: 'Explorador de naturaleza',
      gastronomia: 'Explorador gastronomico',
      festividad: 'Amante del folklore',
      arqueologia: 'Explorador arqueologico',
      espiritualidad: 'Viajero espiritual',
      relax: 'Viajero tranquilo',
    };

    const matchedProfiles = topEtiquetas
      .map((e) => profileMap[e])
      .filter(Boolean);

    if (matchedProfiles.length === 0) {
      return 'Viajero curioso con intereses diversos';
    }

    return `Tu perfil es: ${matchedProfiles.join(' y ')}. Bolivia tiene experiencias perfectas para vos.`;
  }

  private buildTips(etiquetaCounts: Record<string, number>): QuizTip[] {
    const tips: QuizTip[] = [];

    const has = (tag: string) => (etiquetaCounts[tag] ?? 0) > 0;

    // Tips según perfil detectado
    if (has('altiplano') || has('arqueologia')) {
      tips.push({
        titulo: 'Aclimatate antes de explorar',
        descripcion:
          'La Paz y el altiplano están a más de 3.600 m.s.n.m. Reserva las primeras 24–48 horas para aclimatarte. El mate de coca es tu mejor aliado contra el mal de altura.',
      });
    }

    if (has('aventura') || has('naturaleza')) {
      tips.push({
        titulo: 'Mejor época para explorar',
        descripcion:
          'La temporada seca (mayo–octubre) es ideal para senderismo y actividades al aire libre. Las rutas son más accesibles y el cielo despejado garantiza vistas espectaculares.',
      });
    }

    if (has('fotografia') || has('paisaje') || has('unico_en_el_mundo')) {
      tips.push({
        titulo: 'Fotografía en el Salar',
        descripcion:
          'Para el efecto espejo en el Salar de Uyuni, viajá entre enero y abril (temporada de lluvias). Llevá botas de goma, el agua puede llegar a los 30 cm. La hora azul al amanecer da las mejores tomas.',
      });
    }

    if (has('gastronomia') || has('cocina_andina') || has('picante')) {
      tips.push({
        titulo: 'Desayuná como boliviano',
        descripcion:
          'La salteña se come exclusivamente en la mañana (hasta las 11:00). En La Paz, el Mercado de las Brujas y el Mercado Lanza son paradas obligatorias para probar comida local a precios accesibles.',
      });
    }

    if (has('festividad') || has('carnaval') || has('danza')) {
      tips.push({
        titulo: 'Reservá con meses de anticipación en Carnaval',
        descripcion:
          'El Carnaval de Oruro (febrero) es el mayor espectáculo folclórico de Bolivia. Los hoteles se agotan con 6 meses de anticipación. Si llegás sin reserva, hospedáte en ciudades cercanas.',
      });
    }

    if (has('historia') || has('patrimonio_unesco') || has('arquitectura')) {
      tips.push({
        titulo: 'Pasaporte de sitios UNESCO',
        descripcion:
          'Bolivia tiene 7 sitios Patrimonio de la Humanidad. Tiwanaku, Sucre, Potosí, el Carnaval de Oruro y las Misiones Jesuíticas son los más accesibles. Algunos admiten guías locales certificados que enriquecen enormemente la visita.',
      });
    }

    if (has('espiritualidad') || has('cultura_aymara')) {
      tips.push({
        titulo: 'Respetá las ceremonias y rituales',
        descripcion:
          'En la Isla del Sol y el Lago Titicaca hay sitios ceremoniales activos. Pedí permiso antes de fotografiar y evitá interrumpir rituales. Muchas comunidades ofrecen experiencias auténticas de convivencia.',
      });
    }

    // Tip universal si no hay suficientes tips
    if (tips.length < 2) {
      tips.push({
        titulo: 'Temperatura: capas son clave',
        descripcion:
          'Bolivia tiene climas extremos según la altitud. En el altiplano puede hacer 25°C al mediodía y bajar a -5°C de noche. Vestite en capas y siempre llevá una chaqueta impermeable.',
      });
      tips.push({
        titulo: 'Moneda y pagos',
        descripcion:
          'El boliviano (BOB) es la moneda local. En ciudades se acepta tarjeta, pero en mercados, sitios arqueológicos y pueblos rurales es imprescindible efectivo. Los cajeros en aeropuertos y centros comerciales cobran menos comisión.',
      });
    }

    // Máximo 4 tips
    return tips.slice(0, 4);
  }
}
