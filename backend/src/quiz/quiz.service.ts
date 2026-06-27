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

export interface QuizRecommendation {
  lugares: Site[];
  gastronomia: Site[];
  experiencias: Site[];
  perfilViajero: string;
  /** Consejos prácticos personalizados basados en el perfil detectado */
  tips: QuizTip[];
}

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

    return { lugares, gastronomia, experiencias, perfilViajero, tips };
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
