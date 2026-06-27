export type SiteTipo = 'sitio' | 'patrimonio_inmaterial';

export type SiteCategoria =
  | 'sitio_turistico'
  | 'gastronomia'
  | 'danza'
  | 'tradicion_festividad';

export type Departamento =
  | 'La Paz'
  | 'Oruro'
  | 'Potosi'
  | 'Cochabamba'
  | 'Santa Cruz'
  | 'Beni'
  | 'Pando'
  | 'Tarija'
  | 'Chuquisaca';

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Site {
  id: string;
  tipo: SiteTipo;
  categoria: SiteCategoria;
  nombre: string;
  departamento: Departamento;
  coordenadas?: Coordenadas;
  descripcionBaseEs: string;
  descripcionCorta: string;
  imagenUrl: string;
  etiquetas: string[];
  destacado?: boolean;
}
