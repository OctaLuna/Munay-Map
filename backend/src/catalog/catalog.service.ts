import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import type { Site } from './site.interface';
import type { GetSitesQueryDto } from './dto/get-sites-query.dto';

@Injectable()
export class CatalogService {
  private readonly sites: Site[];

  constructor() {
    // __dirname → dist/src/catalog → go up 3 levels to reach the project root
    const filePath = path.join(__dirname, '..', '..', '..', 'data', 'sites.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    this.sites = JSON.parse(raw) as Site[];
  }

  findAll(query: GetSitesQueryDto): Site[] {
    let result = [...this.sites];

    if (query.departamento) {
      result = result.filter(
        (s) =>
          s.departamento.toLowerCase() === query.departamento!.toLowerCase(),
      );
    }

    if (query.categoria) {
      result = result.filter(
        (s) => s.categoria.toLowerCase() === query.categoria!.toLowerCase(),
      );
    }

    if (query.busqueda) {
      const term = query.busqueda
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Mn}/gu, '');
      result = result.filter((s) => {
        const searchable = [
          s.nombre,
          s.descripcionBaseEs,
          s.descripcionCorta,
          s.departamento,
          ...s.etiquetas,
        ]
          .join(' ')
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Mn}/gu, '');
        return searchable.includes(term);
      });
    }

    return result;
  }

  findById(id: string): Site {
    const site = this.sites.find((s) => s.id === id);
    if (!site) {
      throw new NotFoundException(`Sitio con id "${id}" no encontrado`);
    }
    return site;
  }

  /** Usado por RecognizeModule y QuizModule */
  findByEtiquetas(etiquetas: string[]): Site[] {
    if (etiquetas.length === 0) return [];
    return this.sites
      .map((site) => ({
        site,
        score: site.etiquetas.filter((e) => etiquetas.includes(e)).length,
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ site }) => site);
  }

  /** Usado por RecognizeModule — busca por nombre de landmark */
  findByLandmark(landmarkName: string): Site | undefined {
    const normalized = landmarkName
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Mn}/gu, '');
    return this.sites.find((s) => {
      const name = s.nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Mn}/gu, '');
      return name.includes(normalized) || normalized.includes(name);
    });
  }

  getAll(): Site[] {
    return this.sites;
  }
}
