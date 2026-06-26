import type { CulturalAsset } from '@/types'

/**
 * Assets multimedia asociados a los sitios mock
 * En el backend real, estos vendrán de la respuesta de GET /catalog/sites/:id
 */
export const CULTURAL_ASSETS: CulturalAsset[] = [
  {
    id: 'asset-tiwanaku-1',
    siteId: 'tiwanaku',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1589650381083-5d08a59f49cf?w=1200&q=80',
    altText: 'Puerta del Sol de Tiwanaku al amanecer',
  },
  {
    id: 'asset-tiwanaku-2',
    siteId: 'tiwanaku',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80',
    altText: 'Detalle de la arquitectura lítica de Tiwanaku',
  },
  {
    id: 'asset-uyuni-1',
    siteId: 'salar-uyuni',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80',
    altText: 'Reflejo del cielo en el Salar de Uyuni durante la temporada de lluvias',
  },
  {
    id: 'asset-uyuni-2',
    siteId: 'salar-uyuni',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1508247967583-7d982ea01526?w=1200&q=80',
    altText: 'Hexágonos de sal del Salar de Uyuni en época seca',
  },
  {
    id: 'asset-titicaca-1',
    siteId: 'lago-titicaca',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1580099567284-ecab8823b8e2?w=1200&q=80',
    altText: 'Vista panorámica del Lago Titicaca desde la Isla del Sol',
  },
  {
    id: 'asset-potosi-1',
    siteId: 'potosi-cerro-rico',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80',
    altText: 'Vista de Potosí con el Cerro Rico al fondo',
  },
  {
    id: 'asset-morenada-1',
    siteId: 'morenada',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1200&q=80',
    altText: 'Danzarines de Morenada en el Carnaval de Oruro',
  },
  {
    id: 'asset-diablada-1',
    siteId: 'diablada',
    tipo: 'imagen',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    altText: 'Máscara de diablo en la Diablada del Carnaval de Oruro',
  },
]
