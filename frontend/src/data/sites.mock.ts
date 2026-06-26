import type { Site } from '@/types'

/**
 * Mock de sitios y patrimonio cultural boliviano
 * 8 registros: 4 sitios turísticos + 4 patrimonio inmaterial
 * Distribuidos en 5 departamentos con etiquetas consistentes para el Quiz
 */
export const SITES_MOCK: Site[] = [
  // ─── SITIOS TURÍSTICOS ────────────────────────────────────────────────────
  {
    id: 'tiwanaku',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Tiwanaku',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5547, lng: -68.6736 },
    descripcionBaseEs:
      'Tiwanaku es una de las civilizaciones precolombinas más importantes de América del Sur. ' +
      'Sus ruinas, declaradas Patrimonio de la Humanidad por la UNESCO en 2000, incluyen la imponente ' +
      'Puerta del Sol, la Pirámide de Akapana y el Templo Semisubterráneo. Esta ciudad sagrada alcanzó ' +
      'su apogeo entre el 300 y el 1000 d.C., siendo el centro político y espiritual de un vasto imperio ' +
      'que dominó los Andes centrales. Sus constructores dominaron técnicas hidráulicas y arquitectónicas ' +
      'que siguen asombrando a los arqueólogos modernos.',
    descripcionCorta:
      'Centro ceremonial prehispánico declarado Patrimonio de la Humanidad. Hogar de la mítica Puerta del Sol.',
    imagenUrl:
      'https://images.unsplash.com/photo-1589650381083-5d08a59f49cf?w=800&q=80',
    etiquetas: ['arqueologia', 'historia', 'cultura', 'patrimonio_unesco', 'altiplano', 'aventura'],
    destacado: true,
  },
  {
    id: 'salar-uyuni',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Salar de Uyuni',
    departamento: 'Potosí',
    coordenadas: { lat: -20.1338, lng: -67.4891 },
    descripcionBaseEs:
      'El Salar de Uyuni es el mayor desierto de sal del mundo, con más de 10.000 km². ' +
      'En época de lluvias (diciembre–abril), una fina capa de agua crea el mayor espejo natural ' +
      'del planeta, reflejando perfectamente el cielo. En seco, la superficie blanca infinita contrasta ' +
      'con volcanes nevados y el cielo azul del altiplano boliviano a 3.656 metros sobre el nivel del mar. ' +
      'Alberga el 50–70% de las reservas mundiales de litio y es hogar de flamencos rosados.',
    descripcionCorta:
      'El mayor desierto de sal del mundo. En época de lluvias se convierte en el espejo natural más grande del planeta.',
    imagenUrl:
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    etiquetas: [
      'naturaleza',
      'paisaje',
      'fotografia',
      'altiplano',
      'aventura',
      'relax',
      'unico_en_el_mundo',
    ],
    destacado: true,
  },
  {
    id: 'lago-titicaca',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Lago Titicaca e Isla del Sol',
    departamento: 'La Paz',
    coordenadas: { lat: -16.0219, lng: -69.1836 },
    descripcionBaseEs:
      'El Lago Titicaca, a 3.812 metros sobre el nivel del mar, es el lago navegable más alto del mundo ' +
      'y la cuna mítica de la civilización inca. La Isla del Sol concentra más de 80 ruinas arqueológicas, ' +
      'incluyendo el Palacio de Pilkokaina y la Roca Sagrada desde donde, según la leyenda, surgieron ' +
      'Manco Cápac y Mama Ocllo para fundar el Imperio Inca. Las comunidades aymaras que viven en sus orillas ' +
      'preservan tradiciones milenarias de navegación en balsas de totora.',
    descripcionCorta:
      'El lago navegable más alto del mundo. Cuna mítica del Imperio Inca y hogar de comunidades aymaras.',
    imagenUrl:
      'https://images.unsplash.com/photo-1580099567284-ecab8823b8e2?w=800&q=80',
    etiquetas: ['naturaleza', 'historia', 'cultura', 'arqueologia', 'altiplano', 'espiritualidad'],
    destacado: true,
  },
  {
    id: 'potosi-cerro-rico',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Potosí y el Cerro Rico',
    departamento: 'Potosí',
    coordenadas: { lat: -19.5836, lng: -65.7531 },
    descripcionBaseEs:
      'Potosí fue la ciudad más grande del mundo en el siglo XVII, gracias a las inagotables vetas de plata ' +
      'del Cerro Rico. Declarada Patrimonio de la Humanidad, su centro histórico conserva más de 2.000 edificios ' +
      'coloniales, iglesias barrocas mestizas y la histórica Casa de la Moneda, donde se acuñó la plata que ' +
      'financió el Imperio Español durante tres siglos. A 4.090 metros sobre el nivel del mar, es una de las ' +
      'ciudades habitadas más altas del mundo.',
    descripcionCorta:
      'Ciudad colonial declarada Patrimonio UNESCO. Hogar de la legendaria plata que financió un imperio.',
    imagenUrl:
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    etiquetas: ['historia', 'cultura', 'patrimonio_unesco', 'arquitectura', 'altiplano'],
    destacado: false,
  },

  // ─── PATRIMONIO INMATERIAL ────────────────────────────────────────────────
  {
    id: 'chuño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Chuño y la papa deshidratada andina',
    departamento: 'La Paz',
    coordenadas: undefined,
    descripcionBaseEs:
      'El chuño es uno de los primeros alimentos deshidratados de la humanidad, desarrollado hace más de ' +
      '2.000 años por las comunidades del altiplano andino. El proceso aprovecha las heladas nocturnas ' +
      '(entre -10°C y -15°C) y el sol intenso del altiplano para transformar la papa en un producto ' +
      'que puede conservarse por décadas. El chuño negro se obtiene congelando, pisando y secando al sol; ' +
      'el tunta (chuño blanco) pasa además por un proceso de remojo en agua corriente. Ambos son base ' +
      'de platos emblemáticos como el picante de pollo y el caldo de chuño.',
    descripcionCorta:
      'Técnica milenaria andina de deshidratación de papa. Uno de los primeros alimentos procesados de la humanidad.',
    imagenUrl:
      'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80',
    etiquetas: [
      'gastronomia',
      'tradicion',
      'cocina_andina',
      'altiplano',
      'picante',
      'patrimonio_inmaterial',
    ],
    destacado: false,
  },
  {
    id: 'morenada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza',
    nombre: 'Morenada',
    departamento: 'Oruro',
    coordenadas: undefined,
    descripcionBaseEs:
      'La Morenada es la danza emblemática del Carnaval de Oruro, declarado Obra Maestra del ' +
      'Patrimonio Oral e Intangible de la Humanidad por la UNESCO en 2001. Nació en las minas de plata ' +
      'coloniales como representación de los esclavos africanos traídos a trabajar en el Cerro Rico. ' +
      'Sus trajes son los más elaborados del folklore boliviano: máscaras con ojos saltones que pesan ' +
      'hasta 15 kg, capas bordadas con piedras preciosas y sombreros de ala ancha. Las fraternidades ' +
      'invierten un año entero en preparar los trajes y la coreografía.',
    descripcionCorta:
      'Danza emblemática del Carnaval de Oruro declarado Patrimonio UNESCO. Trajes que pesan hasta 15 kg.',
    imagenUrl:
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'carnaval', 'patrimonio_unesco', 'festividad', 'musica'],
    destacado: true,
  },
  {
    id: 'diablada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza',
    nombre: 'Diablada',
    departamento: 'Oruro',
    coordenadas: undefined,
    descripcionBaseEs:
      'La Diablada es una de las danzas más espectaculares del mundo andino, donde danzarines ' +
      'ataviados como diablos representan la batalla entre el bien y el mal. La danza tiene raíces ' +
      'en las minas coloniales donde los mineros veneraban a "El Tío", espíritu protector de las minas, ' +
      'fusionando creencias aymaras con el catolicismo impuesto. Las máscaras de yeso y fibra de vidrio ' +
      'representan seres mitológicos con serpientes, sapos y cuernos dorados. Es el punto culminante ' +
      'del Carnaval de Oruro, que congrega a más de 28.000 danzarines y 400.000 espectadores.',
    descripcionCorta:
      'Danza monumental del Carnaval de Oruro. Diablos y ángeles en una batalla espiritual de raíces andinas.',
    imagenUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'carnaval', 'festividad', 'musica', 'tradicion', 'espiritual'],
    destacado: true,
  },
  {
    id: 'alasitas',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Feria de Alasitas',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5, lng: -68.15 },
    descripcionBaseEs:
      'Alasitas es la festividad más importante de La Paz, celebrada cada 24 de enero en honor ' +
      'al Ekeko, dios aymara de la abundancia representado como un hombrecito sonriente cargado de ' +
      'miniaturas. En esta feria milenaria, los paceños adquieren en miniatura todo lo que desean ' +
      'obtener durante el año: casas, autos, títulos universitarios, pasaportes, dólares. Un yatiri ' +
      '(sacerdote aymara) bendice las miniaturas al mediodía. La tradición data al menos del siglo XVII ' +
      'y convoca a cientos de miles de personas en el campo ferial más grande de Bolivia.',
    descripcionCorta:
      'Festividad milenaria aymara donde se compran miniaturas para manifestar los deseos del año.',
    imagenUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: [
      'festividad',
      'tradicion',
      'cultura_aymara',
      'mercado',
      'artesania',
      'espiritualidad',
      'patrimonio_inmaterial',
    ],
    destacado: false,
  },
]
