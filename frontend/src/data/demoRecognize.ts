/**
 * demoRecognize.ts
 * Datos hardcodeados para la demo del flujo de cámara.
 * Se alternan en cada carga de página: Puerta del Sol → Salar de Uyuni → Puerta del Sol → …
 */
import type { RecognizeResponse } from '@/types'

export const DEMO_RESULTS: RecognizeResponse[] = [
  // ── 1. PUERTA DEL SOL — Tiwanaku ────────────────────────────────────────────
  {
    site: {
      id: 'tiwanaku',
      tipo: 'sitio',
      categoria: 'sitio_turistico',
      nombre: 'Puerta del Sol — Tiwanaku',
      departamento: 'La Paz',
      coordenadas: { lat: -16.5547, lng: -68.6736 },
      descripcionBaseEs:
        'La Puerta del Sol es el monumento más emblemático de Tiwanaku, la civilización precolombina más ' +
        'importante de los Andes. Tallada en un único bloque de andesita de 10 toneladas, su friso superior ' +
        'muestra al dios Viracocha rodeado de 48 figuras aladas. Fue declarada Patrimonio de la Humanidad ' +
        'por la UNESCO en el año 2000.',
      descripcionCorta:
        'Monolito sagrado de la civilización Tiwanaku, tallado en un solo bloque de andesita de 10 toneladas.',
      imagenUrl:
        'https://images.unsplash.com/photo-1589650381083-5d08a59f49cf?w=1200&q=85',
      etiquetas: ['arqueologia', 'historia', 'cultura', 'patrimonio_unesco', 'altiplano'],
      destacado: true,
    },
    explicacion:
      'La Puerta del Sol es uno de los íconos más misteriosos de América precolombina. ' +
      'Fue construida por la civilización Tiwanaku entre los años 300 y 900 d.C., en pleno altiplano ' +
      'boliviano a casi 3.900 metros sobre el nivel del mar. El friso central representa a Viracocha, ' +
      'la deidad creadora andina, flanqueado por 48 figuras con cabezas de cóndor y puma que simbolizan ' +
      'los meses del año y los ciclos agrícolas.\n\n' +
      'Lo más asombroso es que la puerta pesa más de 10 toneladas y fue tallada en un único bloque de ' +
      'piedra andesita traído desde canteras a más de 90 km de distancia, sin ruedas ni animales de tiro. ' +
      'Los arqueólogos aún debaten cómo la civilización Tiwanaku logró tal proeza de ingeniería hace más ' +
      'de 1.500 años.\n\n' +
      'Se cree que la puerta funcionaba como calendario astronómico: en los equinoccios, el sol sale ' +
      'exactamente alineado con su eje central, iluminando la figura de Viracocha. Este conocimiento ' +
      'astronómico permitió a los Tiwanaku planificar sus cosechas y rituales con precisión extraordinaria.',
    idioma: 'es',
    audioUrl: null,
    confianza: 0.97,
    ubicacion: {
      descripcion: 'Complejo arqueológico de Tiwanaku, altiplano boliviano, a 3.841 m s.n.m.',
      comoLlegar:
        'Desde La Paz: bus o minibús desde el terminal de Cemetario (2 h, ~Bs 15). ' +
        'En auto por la carretera a Desaguadero, 72 km al oeste de La Paz (1 h).',
      altitudMetros: 3841,
      distanciaLaPaz: '72 km — 1 h en auto',
    },
    datosImportantes: [
      'Declarado Patrimonio de la Humanidad UNESCO en el año 2000',
      'La puerta pesa más de 10 toneladas y fue tallada en un solo bloque de andesita',
      'La civilización Tiwanaku habitó la zona entre el 300 y el 1000 d.C.',
      'El complejo abarca más de 4 km² con pirámides, templos y monolitos',
      'La Pirámide de Akapana tiene 18 m de altura y fue centro ceremonial principal',
      'Entrada al complejo: Bs 100 nacionales / USD 15 extranjeros',
    ],
    datosCuriosos: [
      'En los equinoccios (21 marzo y 21 septiembre) el sol se alinea perfectamente con el centro de la puerta',
      'Las 48 figuras del friso representan los meses del calendario Tiwanaku',
      'Las piedras fueron transportadas desde canteras a 90 km usando balsas de totora en el lago Titicaca',
      'La puerta fue encontrada partida en dos piezas; se desconoce por qué o quién la fracturó',
      'El nombre "Tiwanaku" en aymara significa "piedra en el centro" o "lugar de reposo"',
      'Se estima que en su apogeo la ciudad albergó entre 10.000 y 20.000 habitantes',
    ],
    mejorEpoca: {
      meses: 'Mayo — Octubre',
      descripcion:
        'La temporada seca del altiplano (mayo-octubre) ofrece cielos despejados y temperaturas ' +
        'de 10–18 °C de día. Evitar diciembre–febrero (lluvia intensa). ' +
        'El 21 de junio (Año Nuevo Aymara) miles de personas se reúnen al amanecer para recibir ' +
        'los primeros rayos del sol a través de la Puerta del Sol: una experiencia única.',
    },
    entrada: {
      precio: 'Bs 100 nacionales / USD 15 extranjeros',
      horario: 'Lunes a domingo 09:00 — 17:00',
    },
  },

  // ── 2. SALAR DE UYUNI ────────────────────────────────────────────────────────
  {
    site: {
      id: 'salar-uyuni',
      tipo: 'sitio',
      categoria: 'sitio_turistico',
      nombre: 'Salar de Uyuni',
      departamento: 'Potosí',
      coordenadas: { lat: -20.1338, lng: -67.4891 },
      descripcionBaseEs:
        'El Salar de Uyuni es el mayor desierto de sal del mundo con más de 10.000 km². ' +
        'En época de lluvias una fina capa de agua crea el espejo natural más grande del planeta. ' +
        'Alberga entre el 50 y 70% de las reservas mundiales de litio y es hogar de flamencos rosados.',
      descripcionCorta:
        'El mayor desierto de sal del mundo. En época de lluvias se convierte en el espejo natural más grande del planeta.',
      imagenUrl:
        'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=85',
      etiquetas: ['naturaleza', 'paisaje', 'fotografia', 'altiplano', 'aventura', 'unico_en_el_mundo'],
      destacado: true,
    },
    explicacion:
      'El Salar de Uyuni es una de las maravillas naturales más impresionantes del planeta. ' +
      'Con más de 10.000 km² de extensión y una altitud de 3.656 m s.n.m., es el desierto de sal ' +
      'más grande del mundo, resultado de la evaporación de antiguos lagos prehistóricos hace ' +
      'más de 40.000 años.\n\n' +
      'El espectáculo más buscado del mundo ocurre entre diciembre y abril: una fina capa de agua ' +
      'de pocos centímetros transforma el salar en el espejo natural más grande del planeta, ' +
      'creando una reflexión perfecta del cielo que hace imposible distinguir dónde termina ' +
      'la tierra y empieza el cielo. Las fotografías de perspectiva forzada que se obtienen allí ' +
      'son únicas en el mundo.\n\n' +
      'Pero el Salar guarda otro tesoro: bajo su costra de sal de hasta 10 metros de profundidad ' +
      'se encuentra la mayor reserva de litio del planeta —el mineral clave para las baterías ' +
      'de autos eléctricos y teléfonos—, con estimaciones de entre 21 y 23 millones de toneladas. ' +
      'Además, la Isla Incahuasi en el centro del salar está cubierta de cactus gigantes que ' +
      'crecen apenas 1 cm por año y tienen más de 1.200 años de antigüedad.',
    idioma: 'es',
    audioUrl: null,
    confianza: 0.98,
    ubicacion: {
      descripcion:
        'Departamento de Potosí, sudoeste de Bolivia. Centro del salar a 3.656 m s.n.m. ' +
        'Acceso principal desde la ciudad de Uyuni.',
      comoLlegar:
        'Desde La Paz: vuelo a Uyuni (45 min, ~USD 80-120) o bus nocturno (10 h, ~Bs 80). ' +
        'Desde Uyuni: tour en jeep 4x4 desde Bs 200/persona el día. ' +
        'Imprescindible contratar guía local para acceder al interior del salar.',
      altitudMetros: 3656,
      distanciaLaPaz: '570 km — 10 h en bus / 45 min en avión',
    },
    datosImportantes: [
      'Es el mayor desierto de sal del mundo: más de 10.582 km²',
      'Alberga entre el 50-70% de las reservas mundiales de litio',
      'La costra de sal tiene entre 2 y 10 metros de profundidad',
      'En época de lluvias forma el espejo natural más grande del planeta',
      'La Isla Incahuasi tiene cactus de más de 1.200 años de antigüedad',
      'Es hogar de tres especies de flamencos: andino, chileno y de James',
    ],
    datosCuriosos: [
      'Fue el fondo de un lago prehistórico (Lago Minchin) que se evaporó hace ~40.000 años',
      'La superficie es tan plana que la NASA la usa para calibrar altímetros de satélites',
      'Los cactus de la Isla Incahuasi crecen apenas 1 cm por año',
      'En el punto más profundo hay una bolsa de salmuera de litio a 40 metros de profundidad',
      'Los flamencos viajan más de 1.000 km desde el norte de Argentina para anidar aquí',
      'El tren cementerio a 3 km de Uyuni tiene locomotoras abandonadas desde 1940',
    ],
    mejorEpoca: {
      meses: 'Noviembre — Abril (espejo) / Mayo — Octubre (foto seco)',
      descripcion:
        'Para el efecto espejo: diciembre–marzo con lluvia reciente (la capa de agua dura días). ' +
        'Para fotografías de paisaje y tours en jeep: mayo–octubre, cielos despejados y superficie ' +
        'de sal blanca pura. Noviembre es transición con días secos y primeras lluvias nocturnas. ' +
        'Evitar enero-febrero si el salar está muy inundado (tours se cancelan).',
    },
    entrada: {
      precio: 'Bs 30 tasa de ingreso al área protegida + tour obligatorio desde Bs 180/persona',
      horario: 'Acceso 24 h con guía — tours salen desde las 06:00 de Uyuni',
    },
  },
]
