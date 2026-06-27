import type { Site } from '@/types'

/**
 * Catálogo completo de sitios y patrimonio cultural boliviano
 * 70+ registros organizados por sección:
 *   1. Sitios turísticos (20)
 *   2. Gastronomía (20)
 *   3. Danzas y folklore (15)
 *   4. Tradiciones y festividades (15)
 */
export const SITES_MOCK: Site[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // SITIOS TURÍSTICOS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'tiwanaku',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Tiwanaku',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5547, lng: -68.6736 },
    descripcionBaseEs:
      'Centro ceremonial prehispánico declarado Patrimonio de la Humanidad por la UNESCO. ' +
      'Cuna de la civilización tiwanacota que floreció junto al Lago Titicaca y cuyas construcciones ' +
      'de piedra siguen desafiando la comprensión moderna.',
    descripcionCorta:
      'Centro ceremonial prehispánico declarado Patrimonio UNESCO. Hogar de la mítica Puerta del Sol.',
    imagenUrl: 'https://images.unsplash.com/photo-1589650381083-5d08a59f49cf?w=800&q=80',
    etiquetas: ['arqueologia', 'historia', 'cultura', 'patrimonio_unesco', 'altiplano', 'aventura'],
    destacado: true,
  },
  {
    id: 'salar-de-uyuni',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Salar de Uyuni',
    departamento: 'Potosí',
    coordenadas: { lat: -20.1338, lng: -67.4891 },
    descripcionBaseEs:
      'El mayor desierto de sal continuo del mundo, con más de 12.000 km². En época de lluvias ' +
      'se convierte en el espejo natural más grande del planeta, donde el cielo y la tierra ' +
      'se funden en un reflejo infinito.',
    descripcionCorta:
      'El mayor desierto de sal del mundo. En época de lluvias, el espejo natural más grande del planeta.',
    imagenUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    etiquetas: ['naturaleza', 'paisaje', 'fotografia', 'altiplano', 'aventura', 'unico_en_el_mundo'],
    destacado: true,
  },
  {
    id: 'lago-titicaca-isla-del-sol',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Lago Titicaca e Isla del Sol',
    departamento: 'La Paz',
    coordenadas: { lat: -16.0219, lng: -69.1836 },
    descripcionBaseEs:
      'El lago navegable más alto del mundo, a 3.810 m.s.n.m. La Isla del Sol alberga ruinas incas ' +
      'y la legendaria Roca Sagrada donde, según la tradición, nacieron Manco Cápac y Mama Ocllo, ' +
      'fundadores del Imperio Inca.',
    descripcionCorta:
      'El lago navegable más alto del mundo. Cuna mítica del Imperio Inca y hogar de comunidades aymaras.',
    imagenUrl: 'https://images.unsplash.com/photo-1580099567284-ecab8823b8e2?w=800&q=80',
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
      'Ciudad colonial declarada Patrimonio UNESCO en 1987. Hogar de la plata que financió la ' +
      'Europa feudal durante siglos. El Cerro Rico alberga más de 100 minas activas y la Casa ' +
      'de la Moneda, uno de los museos más importantes de América Latina.',
    descripcionCorta:
      'Ciudad colonial declarada Patrimonio UNESCO. Hogar de la legendaria plata que financió un imperio.',
    imagenUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    etiquetas: ['historia', 'cultura', 'patrimonio_unesco', 'arquitectura', 'altiplano'],
    destacado: false,
  },
  {
    id: 'sucre-ciudad-blanca',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Sucre, la Ciudad Blanca',
    departamento: 'Chuquisaca',
    coordenadas: { lat: -19.0478, lng: -65.2596 },
    descripcionBaseEs:
      'Capital constitucional de Bolivia y Patrimonio UNESCO. Sus calles coloniales blancas, ' +
      'balcones y claveles rojos conservan la historia de la independencia americana. Sede de la ' +
      'universidad más antigua del país, fundada en 1624.',
    descripcionCorta:
      'Capital constitucional y Patrimonio UNESCO. Ciudad colonial blanca cuna de la independencia.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618047-f4e60d7c0ed6?w=800&q=80',
    etiquetas: ['historia', 'arquitectura', 'colonial', 'patrimonio_unesco', 'cultura'],
    destacado: true,
  },
  {
    id: 'parque-nacional-madidi',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Parque Nacional Madidi',
    departamento: 'La Paz',
    coordenadas: { lat: -13.5833, lng: -68.2 },
    descripcionBaseEs:
      'Una de las áreas protegidas con mayor biodiversidad del planeta. Desde las nieves perpetuas ' +
      'de los Andes hasta la llanura amazónica, alberga ecosistemas únicos declarados santuario ' +
      'de la humanidad por la National Geographic.',
    descripcionCorta:
      'Una de las áreas con mayor biodiversidad del planeta. De las nieves andinas a la selva amazónica.',
    imagenUrl: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80',
    etiquetas: ['naturaleza', 'biodiversidad', 'amazonia', 'aventura', 'ecoturismo'],
    destacado: true,
  },
  {
    id: 'fuerte-de-samaipata',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'El Fuerte de Samaipata',
    departamento: 'Santa Cruz',
    coordenadas: { lat: -18.3667, lng: -63.8667 },
    descripcionBaseEs:
      'Sitio arqueológico preincaico con la roca tallada más grande del mundo, declarado Patrimonio ' +
      'UNESCO en 1998. Centro ceremonial de origen chané que domina el valle desde la cima de una ' +
      'montaña, a 9 km del pueblo colonial de Samaipata.',
    descripcionCorta:
      'La roca tallada más grande del mundo. Patrimonio UNESCO y centro ceremonial preincaico.',
    imagenUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    etiquetas: ['arqueologia', 'patrimonio_unesco', 'historia', 'naturaleza'],
    destacado: false,
  },
  {
    id: 'valle-de-la-luna',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Valle de la Luna',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5667, lng: -68.1 },
    descripcionBaseEs:
      'Formación geológica de arcilla y yeso erosionada por milenios de viento y lluvia. Su paisaje ' +
      'de torres, agujas y laberintos color ocre recuerda la superficie lunar y se ubica a solo ' +
      '10 km del centro de La Paz.',
    descripcionCorta:
      'Paisaje lunar de arcilla y yeso a 10 km del centro de La Paz. Torres y agujas de colores ocre.',
    imagenUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    etiquetas: ['naturaleza', 'geologia', 'paisaje', 'aventura', 'fotografia'],
    destacado: false,
  },
  {
    id: 'copacabana',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Copacabana y la Virgen',
    departamento: 'La Paz',
    coordenadas: { lat: -16.1667, lng: -69.0833 },
    descripcionBaseEs:
      'Ciudad lacustre a orillas del Titicaca y sede del santuario de la Virgen de Copacabana, ' +
      'patrona de Bolivia. Cada año atrae a miles de peregrinos que combinan procesiones católicas ' +
      'con danzas y ofrendas aymaras ancestrales.',
    descripcionCorta:
      'Santuario de la Virgen patrona de Bolivia a orillas del Titicaca. Punto de peregrinación andina.',
    imagenUrl: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=800&q=80',
    etiquetas: ['religion', 'cultura', 'lago', 'festividad', 'espiritualidad'],
    destacado: false,
  },
  {
    id: 'parque-nacional-toro-toro',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Parque Nacional Toro Toro',
    departamento: 'Potosí',
    coordenadas: { lat: -18.1333, lng: -65.7667 },
    descripcionBaseEs:
      'Cañón espectacular con huellas de dinosaurios saurópodos, terópodos y anquilosaurios impresas ' +
      'hace millones de años. Alberga también cavernas con estalactitas y estalagmitas consideradas ' +
      'de las más grandes de la región andina.',
    descripcionCorta:
      'Huellas de dinosaurios y cañones espectaculares. Cavernas con estalactitas de escala andina.',
    imagenUrl: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=800&q=80',
    etiquetas: ['naturaleza', 'paleontologia', 'aventura', 'cañon', 'espeleologia'],
    destacado: false,
  },
  {
    id: 'parque-nacional-noel-kempff',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Parque Nacional Noel Kempff Mercado',
    departamento: 'Santa Cruz',
    coordenadas: { lat: -14.0, lng: -60.5 },
    descripcionBaseEs:
      'Declarado Patrimonio Natural de la Humanidad por la UNESCO en 1991. Sus mesetas precámbricas, ' +
      'cataratas, ríos y bosques tropicales albergan una biodiversidad extraordinaria que inspiró ' +
      'la obra de Arthur Conan Doyle.',
    descripcionCorta:
      'Patrimonio Natural UNESCO. Mesetas precámbricas y cataratas que inspiraron "El Mundo Perdido".',
    imagenUrl: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=800&q=80',
    etiquetas: ['naturaleza', 'patrimonio_unesco', 'biodiversidad', 'amazonia', 'cascadas'],
    destacado: false,
  },
  {
    id: 'misiones-jesuiticas-chiquitania',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Misiones Jesuíticas de Chiquitos',
    departamento: 'Santa Cruz',
    coordenadas: { lat: -16.3333, lng: -60.9667 },
    descripcionBaseEs:
      'Las únicas misiones vivas de toda Sudamérica, fundadas entre 1691 y 1760. Sus catedrales de ' +
      'madera tallada con estilo barroco mestizo, bañadas en pan de oro, son Patrimonio UNESCO y ' +
      'sede del Festival Internacional de Música Barroca.',
    descripcionCorta:
      'Únicas misiones vivas de Sudamérica. Catedrales barrocas de madera dorada, Patrimonio UNESCO.',
    imagenUrl: 'https://images.unsplash.com/photo-1519677584237-752f8853252e?w=800&q=80',
    etiquetas: ['patrimonio_unesco', 'arquitectura', 'historia', 'musica', 'religion'],
    destacado: true,
  },
  {
    id: 'nevado-sajama',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Nevado Sajama',
    departamento: 'Oruro',
    coordenadas: { lat: -18.1, lng: -68.8833 },
    descripcionBaseEs:
      'La montaña más alta de Bolivia con 6.542 m.s.n.m. Este volcán durmiente en el Parque Nacional ' +
      'Sajama es el gran destino del andinismo boliviano, rodeado de géiseres, aguas termales y ' +
      'comunidades aymaras que preservan tradiciones milenarias.',
    descripcionCorta:
      'La montaña más alta de Bolivia a 6.542 m.s.n.m. Volcán rodeado de géiseres y aguas termales.',
    imagenUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    etiquetas: ['montaña', 'andinismo', 'naturaleza', 'altiplano', 'aventura'],
    destacado: false,
  },
  {
    id: 'cal-orko',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Cal Orcko — el muro de los dinosaurios',
    departamento: 'Chuquisaca',
    coordenadas: { lat: -19.0167, lng: -65.2333 },
    descripcionBaseEs:
      'Yacimiento paleontológico único en el mundo ubicado a 5 km de Sucre. Una pared de roca caliza ' +
      'de 80 metros de alto y 1 km de largo conserva más de 5.000 huellas de dinosaurios de 462 ' +
      'especies diferentes.',
    descripcionCorta:
      'Más de 5.000 huellas de dinosaurios en una pared de 80 m. El yacimiento paleontológico más grande del mundo.',
    imagenUrl: 'https://images.unsplash.com/photo-1509027572446-af8401acfdc3?w=800&q=80',
    etiquetas: ['paleontologia', 'historia', 'ciencia', 'unico_en_el_mundo'],
    destacado: false,
  },
  {
    id: 'rurrenabaque',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Rurrenabaque y la Amazonia',
    departamento: 'Beni',
    coordenadas: { lat: -14.4333, lng: -67.5167 },
    descripcionBaseEs:
      'Puerta de la Amazonia boliviana a orillas del río Beni. Punto de partida para tours a la ' +
      'selva tropical y las pampas del Yacumá, donde se avistan caimanes, anacondas, delfines rosados ' +
      'y una fauna salvaje de extraordinaria variedad.',
    descripcionCorta:
      'Puerta de la Amazonia boliviana. Caimanes, anacondas y delfines rosados en las pampas del Beni.',
    imagenUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    etiquetas: ['amazonia', 'naturaleza', 'fauna', 'aventura', 'ecoturismo'],
    destacado: true,
  },
  {
    id: 'laguna-colorada',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Laguna Colorada y el Desierto Dalí',
    departamento: 'Potosí',
    coordenadas: { lat: -22.1667, lng: -67.7667 },
    descripcionBaseEs:
      'Laguna de color rojizo bordeada por flamencos James en el altiplano sureño. Cerca de ella, ' +
      'el Desierto Salvador Dalí sorprende con formaciones rocosas de colores surrealistas que ' +
      'inspiraron pinturas del artista catalán durante su visita a Bolivia.',
    descripcionCorta:
      'Laguna roja con flamencos y formaciones rocosas que inspiraron al pintor Salvador Dalí.',
    imagenUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    etiquetas: ['naturaleza', 'paisaje', 'fotografia', 'altiplano', 'flamingos'],
    destacado: true,
  },
  {
    id: 'carretera-de-la-muerte',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Carretera de la Muerte',
    departamento: 'La Paz',
    coordenadas: { lat: -16.3, lng: -67.85 },
    descripcionBaseEs:
      'Ruta de Yungas declarada en los noventa la carretera más peligrosa del mundo. Hoy convertida ' +
      'en uno de los recorridos de ciclismo de montaña más extremos del planeta, desciende 3.600 metros ' +
      'entre neblina, cascadas y precipicios sobre la selva yungueña.',
    descripcionCorta:
      'La carretera más peligrosa del mundo. Hoy el downhill más extremo del planeta: 3.600 m de descenso.',
    imagenUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    etiquetas: ['aventura', 'ciclismo', 'naturaleza', 'yungas', 'extremo'],
    destacado: false,
  },
  {
    id: 'pantanal-boliviano',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Pantanal Boliviano',
    departamento: 'Santa Cruz',
    coordenadas: { lat: -18.0, lng: -58.0 },
    descripcionBaseEs:
      'Extremo del mayor humedal del mundo, compartido con Brasil. Declarado sitio RAMSAR por su ' +
      'megadiversidad biológica. Sus ríos, lagos y pantanos albergan jaguares, caimanes, tapires y ' +
      'más de 650 especies de aves en un ecosistema casi virgen.',
    descripcionCorta:
      'Extremo del mayor humedal del mundo. Jaguares, caimanes y 650 especies de aves en estado salvaje.',
    imagenUrl: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=800&q=80',
    etiquetas: ['naturaleza', 'humedal', 'fauna', 'biodiversidad', 'ecoturismo'],
    destacado: false,
  },
  {
    id: 'ciudad-de-la-paz',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'La Paz y el Mercado de las Brujas',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5, lng: -68.15 },
    descripcionBaseEs:
      'Sede de gobierno a más de 3.600 m.s.n.m., rodeada de montañas nevadas y el vecino El Alto. ' +
      'Su Mercado de las Brujas ofrece ingredientes rituales aymaras, pociones y amuletos. ' +
      'El teleférico urbano más alto del mundo conecta sus empinados barrios.',
    descripcionCorta:
      'Sede de gobierno a 3.600 m. Teleférico urbano más alto del mundo y el mítico Mercado de las Brujas.',
    imagenUrl: 'https://images.unsplash.com/photo-1559564486-3b47bd14fa70?w=800&q=80',
    etiquetas: ['ciudad', 'cultura', 'mercado', 'altiplano', 'urbanismo'],
    destacado: true,
  },
  {
    id: 'ruta-del-vino-tarija',
    tipo: 'sitio',
    categoria: 'sitio_turistico',
    nombre: 'Ruta del Vino y el Singani',
    departamento: 'Tarija',
    coordenadas: { lat: -21.5355, lng: -64.7296 },
    descripcionBaseEs:
      'Los viñedos más altos del mundo se extienden en los valles tarijeños entre 1.700 y 2.000 m.s.n.m. ' +
      'La ruta recorre bodegas donde se producen el vino tarijeño y el Singani, el aguardiente nacional ' +
      'destilado de uva moscatel, denominación de origen exclusiva de Bolivia.',
    descripcionCorta:
      'Los viñedos más altos del mundo. Bodegas de vino tarijeño y Singani, aguardiente nacional boliviano.',
    imagenUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    etiquetas: ['gastronomia', 'vino', 'naturaleza', 'valle', 'cultura'],
    destacado: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GASTRONOMÍA
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'salteña',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Salteña',
    departamento: 'Todo Bolivia',
    descripcionBaseEs:
      'El desayuno estrella de Bolivia. Empanada horneada rellena de caldo espeso con carne, papa, ' +
      'arveja, aceitunas y pasas. La clave está en comerla de pie sin derramar el jugo. En Potosí ' +
      'y Sucre tienen fama de ser las mejores del país.',
    descripcionCorta:
      'El desayuno estrella de Bolivia. Empanada jugosa que se come de pie sin derramar una gota.',
    imagenUrl: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80',
    etiquetas: ['gastronomia', 'desayuno', 'empanada', 'tradicion', 'cocina_boliviana'],
    destacado: true,
  },
  {
    id: 'silpancho',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Silpancho',
    departamento: 'Cochabamba',
    descripcionBaseEs:
      'El plato emblema de Cochabamba. Capas de arroz blanco, papas hervidas y un filete de carne ' +
      'finamente apanada, coronado con huevo frito y ensalada fresca de tomate, locoto y cebolla. ' +
      'Simple, contundente y absolutamente cochabambino.',
    descripcionCorta:
      'El plato emblema de Cochabamba. Filete apanado con arroz, papas y huevo frito.',
    imagenUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    etiquetas: ['gastronomia', 'cochabamba', 'carne', 'almuerzo', 'cocina_boliviana'],
    destacado: true,
  },
  {
    id: 'pique-macho',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Pique Macho',
    departamento: 'Cochabamba',
    descripcionBaseEs:
      'Creado en Cochabamba en 1974, es el rey de las noches bolivianas. Una montaña de carne de res, ' +
      'salchichas, papas fritas, locoto, tomate y huevo duro servidos juntos en un solo plato. ' +
      'Ideal para compartir, difícil de terminar solo.',
    descripcionCorta:
      'El rey de las noches bolivianas. Montaña de carne, papas fritas y locoto creada en 1974.',
    imagenUrl: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80',
    etiquetas: ['gastronomia', 'noche', 'carne', 'cochabamba', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'fricasé',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Fricasé',
    departamento: 'La Paz',
    descripcionBaseEs:
      'Sopa espesa de cerdo con mote, chuño y ají amarillo, consumida principalmente los fines de ' +
      'semana en La Paz. Los paceños la consideran el mejor remedio contra la resaca. Su caldo ' +
      'sustancioso y su aroma a especias andinas llenan las mesas en madrugada.',
    descripcionCorta:
      'Sopa de cerdo paceña con mote y chuño. El mejor remedio del fin de semana en La Paz.',
    imagenUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    etiquetas: ['gastronomia', 'sopa', 'cerdo', 'la_paz', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'chairo-paceño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Chairo Paceño',
    departamento: 'La Paz',
    descripcionBaseEs:
      'Sopa ceremonial de La Paz preparada con chalona de cordero, chuño, papas, trigo pelado y ' +
      'verduras. Se come en barro y con cuchara de madera para mantener la temperatura. Plato ' +
      'predilecto de las jornadas frías del altiplano.',
    descripcionCorta:
      'Sopa ceremonial paceña con chalona, chuño y trigo. Plato del frío altiplánico.',
    imagenUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    etiquetas: ['gastronomia', 'sopa', 'cordero', 'altiplano', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'majadito',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Majadito',
    departamento: 'Santa Cruz',
    descripcionBaseEs:
      'El desayuno de los cruceños y benianos. Arroz cocido con charque de res o pato desmenuzado, ' +
      'urucu y especias, servido con huevo estrellado y plátano frito. Originario de la región ' +
      'oriental, refleja la abundancia de la cocina amazónica boliviana.',
    descripcionCorta:
      'El desayuno del oriente boliviano. Arroz con charque, huevo y plátano frito.',
    imagenUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    etiquetas: ['gastronomia', 'desayuno', 'santa_cruz', 'arroz', 'amazonia'],
    destacado: false,
  },
  {
    id: 'charquekan-orureño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Charquekan Orureño',
    departamento: 'Oruro',
    descripcionBaseEs:
      'Plato contundente del altiplano orureño. Carne de llama o res deshidratada y tostada, ' +
      'acompañada de mote de maíz, papa, chuño, queso y ají. Comida de mineros y caminantes que ' +
      'necesitaban energía para el frío y la altura.',
    descripcionCorta:
      'Charque de llama con mote, chuño y queso. El plato de energía del altiplano orureño.',
    imagenUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    etiquetas: ['gastronomia', 'oruro', 'llama', 'altiplano', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'plato-paceño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Plato Paceño',
    departamento: 'La Paz',
    descripcionBaseEs:
      'El sabor del altiplano en un solo servicio: choclo en mazorca, papa, haba, chuño y queso ' +
      'frito dorado en aceite. Plato de temporada entre enero y abril cuando se consiguen los ' +
      'ingredientes frescos de la Pachamama. Simple y profundamente andino.',
    descripcionCorta:
      'Choclo, papa, haba, chuño y queso frito. El sabor puro de la Pachamama en temporada.',
    imagenUrl: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80',
    etiquetas: ['gastronomia', 'vegetariano', 'la_paz', 'altiplano', 'temporada'],
    destacado: false,
  },
  {
    id: 'mondongo-chuquisaqueño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Mondongo Chuquisaqueño',
    departamento: 'Chuquisaca',
    descripcionBaseEs:
      'Sopa festiva de Sucre preparada con caldo de panza de res, maíz blanco pelado, ají colorado ' +
      'y hierbabuena. Se sirve en ocasiones especiales y fiestas populares. Su preparación requiere ' +
      'dos días y es orgullo de las cocineras sucrenses.',
    descripcionCorta:
      'Sopa festiva sucrense de panza de res y maíz. Preparación de dos días y orgullo de Chuquisaca.',
    imagenUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    etiquetas: ['gastronomia', 'sopa', 'chuquisaca', 'festividad', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'saice-tarijeño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Saice Chapaco',
    departamento: 'Tarija',
    descripcionBaseEs:
      'Guiso tarijeño de carne molida de res con papa, arveja, cebolla y ají amarillo, de color ' +
      'dorado y sabor intenso. Se sirve con arroz y suele acompañarse con un vino chapaco de la ' +
      'propia región. Plato festivo de los valles del sur boliviano.',
    descripcionCorta:
      'Guiso dorado de carne molida tarijeño. Se sirve con arroz y vino chapaco de la región.',
    imagenUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    etiquetas: ['gastronomia', 'tarija', 'carne', 'valle', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'tucumana',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Tucumana',
    departamento: 'Cochabamba',
    descripcionBaseEs:
      'Empanada frita rellena de carne, papa y arvejas, especialmente popular en las noches ' +
      'cochabambinas. A diferencia de la salteña, se come caliente y crujiente, recién salida ' +
      'del aceite. Presencia obligada en los mercados nocturnos de la Ciudad Jardín.',
    descripcionCorta:
      'Empanada frita nocturna de Cochabamba. Crujiente, caliente y recién salida del aceite.',
    imagenUrl: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80',
    etiquetas: ['gastronomia', 'cochabamba', 'noche', 'frito', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'chuño-papa-deshidratada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Chuño y la Papa Deshidratada Andina',
    departamento: 'La Paz',
    descripcionBaseEs:
      'Técnica milenaria aymara de conservación de la papa mediante el frío del altiplano y la ' +
      'exposición al sol. Uno de los primeros alimentos procesados de la historia humana. El chuño ' +
      'negro y la tunta blanca son ingredientes esenciales de la cocina boliviana.',
    descripcionCorta:
      'Técnica milenaria de deshidratación de papa. Uno de los primeros alimentos procesados de la humanidad.',
    imagenUrl: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80',
    etiquetas: ['gastronomia', 'tradicion', 'cocina_andina', 'altiplano', 'patrimonio_inmaterial'],
    destacado: false,
  },
  {
    id: 'kalapurka',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Kalapurka Potosina',
    departamento: 'Potosí',
    descripcionBaseEs:
      'Sopa ritual de carnaval de Potosí. Se prepara con maíz, carne, ají y se calienta vertiéndole ' +
      'directamente una piedra volcánica al rojo vivo — la kalapurka — dentro del plato, que burbujea ' +
      'espectacularmente. Tradición minera de los Andes sur bolivianos.',
    descripcionCorta:
      'Sopa de carnaval potosina calentada con piedra volcánica al rojo vivo. Tradición minera única.',
    imagenUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    etiquetas: ['gastronomia', 'ritual', 'potosi', 'carnaval', 'tradicion'],
    destacado: false,
  },
  {
    id: 'chicha',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Chicha de Maíz',
    departamento: 'Cochabamba',
    descripcionBaseEs:
      'Bebida fermentada de maíz con siglos de historia andina. La chicha cochabambina es considerada ' +
      'la más fina del país. Se sirve en chicherías identificadas con una bandera blanca en la puerta. ' +
      'Bebida sagrada en rituales andinos y símbolo de reciprocidad comunitaria.',
    descripcionCorta:
      'Bebida fermentada de maíz ancestral. Símbolo de reciprocidad andina; la cochabambina es la mejor.',
    imagenUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
    etiquetas: ['gastronomia', 'bebida', 'fermentado', 'tradicion', 'aymara'],
    destacado: false,
  },
  {
    id: 'singani',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Singani — el aguardiente boliviano',
    departamento: 'Tarija',
    descripcionBaseEs:
      'Aguardiente destilado de uva moscatel de Alejandría cultivada a más de 1.600 m.s.n.m., con ' +
      'denominación de origen exclusiva de Bolivia. De aroma floral y sabor suave, es el ingrediente ' +
      'base del Chuflay y del Ponche Nacional. Bebida identitaria del país.',
    descripcionCorta:
      'Aguardiente de uva moscatel con denominación de origen exclusiva de Bolivia. Base del Chuflay.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['gastronomia', 'bebida', 'tarija', 'destilado', 'tradicion'],
    destacado: true,
  },
  {
    id: 'api',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Api con Pastel',
    departamento: 'La Paz',
    descripcionBaseEs:
      'Bebida caliente de maíz morado o blanco, canela y clavo, que los paceños toman al amanecer ' +
      'en los mercados callejeros. Se acompaña de pastel frito espolvoreado con azúcar. El desayuno ' +
      'del altiplano por excelencia, especialmente en días de frío y festividades.',
    descripcionCorta:
      'Bebida caliente de maíz morado al amanecer. El desayuno del altiplano paceño con pastel frito.',
    imagenUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
    etiquetas: ['gastronomia', 'desayuno', 'bebida', 'la_paz', 'mercado'],
    destacado: false,
  },
  {
    id: 'cuñapé',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Cuñapé y Pan de Arroz',
    departamento: 'Santa Cruz',
    descripcionBaseEs:
      'Panecillo cruceño elaborado con almidón de yuca y queso fresco, crujiente por fuera y ' +
      'esponjoso por dentro. Infaltable en los desayunos del oriente boliviano. El pan de arroz ' +
      'es su variante, también de queso, con una textura única imposible de encontrar fuera de Santa Cruz.',
    descripcionCorta:
      'Pan de yuca y queso crujiente por fuera, esponjoso por dentro. El desayuno del oriente boliviano.',
    imagenUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    etiquetas: ['gastronomia', 'santa_cruz', 'desayuno', 'pan', 'queso'],
    destacado: false,
  },
  {
    id: 'locro-cruceño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Locro Carretero',
    departamento: 'Beni',
    descripcionBaseEs:
      'Sopa espesa y nutritiva de maíz, carne de res, yuca y plátano verde, propia de los llanos ' +
      'orientales y el Beni. Comida de carreteros y viajeros que atravesaban los caminos amazónicos ' +
      'antes de que llegaran las carreteras asfaltadas al oriente boliviano.',
    descripcionCorta:
      'Sopa espesa de maíz, carne y yuca de los llanos orientales. Comida de carreteros y viajeros.',
    imagenUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    etiquetas: ['gastronomia', 'sopa', 'beni', 'amazonia', 'cocina_boliviana'],
    destacado: false,
  },
  {
    id: 'chorizo-cochabambino',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Chorizo Cochabambino',
    departamento: 'Cochabamba',
    descripcionBaseEs:
      'Embutido artesanal de carne de cerdo con especias andinas, ají y hierbas aromáticas. Se ' +
      'vende frito en los mercados cochabambinos al desayuno, acompañado de mote y llajwa. Tiene ' +
      'denominación de origen informal y cada barrio presume de la mejor receta.',
    descripcionCorta:
      'Embutido artesanal de cerdo con ají andino. Frito en mercados cochabambinos con mote y llajwa.',
    imagenUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    etiquetas: ['gastronomia', 'cochabamba', 'embutido', 'desayuno', 'mercado'],
    destacado: false,
  },
  {
    id: 'masaco-platano',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Masaco de Plátano y Queso',
    departamento: 'Pando',
    descripcionBaseEs:
      'Plato amazónico del norte boliviano elaborado con plátano verde machacado mezclado con queso ' +
      'fresco y manteca. Acompañante habitual de los guisos de carne de monte y pescados de río que ' +
      'caracterizan la cocina del departamento de Pando.',
    descripcionCorta:
      'Plátano verde machacado con queso fresco amazónico. Acompañante de carnes de monte en Pando.',
    imagenUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=800&q=80',
    etiquetas: ['gastronomia', 'pando', 'amazonia', 'platano', 'queso'],
    destacado: false,
  },
  {
    id: 'zonzo',
    tipo: 'patrimonio_inmaterial',
    categoria: 'gastronomia',
    nombre: 'Zonzo',
    departamento: 'Santa Cruz',
    descripcionBaseEs:
      'Preparación tradicional cruceña de yuca rallada mezclada con queso, envuelta en hoja de ' +
      'maíz y asada a las brasas. El resultado es una masa firme y dorada con el interior cremoso. ' +
      'Acompañamiento clásico de los asados cruceños.',
    descripcionCorta:
      'Yuca rallada con queso asada en hoja de maíz. El acompañamiento clásico de los asados cruceños.',
    imagenUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    etiquetas: ['gastronomia', 'santa_cruz', 'yuca', 'asado', 'brasa'],
    destacado: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DANZAS Y FOLKLORE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'morenada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'La Morenada',
    departamento: 'Oruro / La Paz',
    descripcionBaseEs:
      'La danza más imponente y masiva de Bolivia. Nació en Oruro para satirizar la esclavitud ' +
      'colonial africana en las minas de Potosí. Sus bailarines portan máscaras negras, trajes que ' +
      'pesan más de 15 kg y danzan con pasos lentos que evocan el frío y las cadenas del altiplano.',
    descripcionCorta:
      'La danza más imponente de Bolivia. Trajes de 15 kg y máscaras negras que critican la esclavitud colonial.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'carnaval', 'patrimonio_unesco', 'festividad', 'musica'],
    destacado: true,
  },
  {
    id: 'diablada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'La Diablada',
    departamento: 'Oruro',
    descripcionBaseEs:
      'Símbolo del Carnaval de Oruro y de Bolivia. Nació en el siglo XVII en honor a la Virgen del ' +
      'Socavón. Diablos con máscaras bordadas y el Arcángel San Miguel representan la eterna lucha ' +
      'entre el bien y el mal. La máscara de Lucifer tarda meses en confeccionarse a mano.',
    descripcionCorta:
      'Símbolo del Carnaval de Oruro. La lucha entre el bien y el mal en máscaras bordadas a mano.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'carnaval', 'festividad', 'musica', 'tradicion', 'espiritual'],
    destacado: true,
  },
  {
    id: 'caporales',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Los Caporales',
    departamento: 'La Paz / Cochabamba',
    descripcionBaseEs:
      'Danza vibrante y acrobática derivada de la Saya afroboliviana. Los hombres ejecutan saltos ' +
      'y figuras acrobáticas con botas de cascabeles, mientras las mujeres visten faldas cortas de ' +
      'colores vivos. Creada en La Paz en los años 70, hoy es una de las danzas más bailadas del país.',
    descripcionCorta:
      'Danza acrobática con botas de cascabeles derivada de la Saya. Creada en La Paz en los 70.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'carnaval', 'la_paz', 'acrobacias'],
    destacado: true,
  },
  {
    id: 'tinku',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'El Tinku',
    departamento: 'Potosí',
    descripcionBaseEs:
      'Danza ritual del norte potosino que escenifica el encuentro y combate ceremonial entre ' +
      'comunidades quechuas. Los bailarines visten el casco de cuero tradicional y túnicas de ' +
      'colores azul y naranja. El Tinku real fue y sigue siendo un ritual de agradecimiento a la Pachamama.',
    descripcionCorta:
      'Danza ritual quechua que escenifica el combate ceremonial entre comunidades. Ofrenda a la Pachamama.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'ritual', 'potosi', 'quechua', 'pachamama'],
    destacado: false,
  },
  {
    id: 'saya-afroboliviana',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Saya Afroboliviana',
    departamento: 'La Paz',
    descripcionBaseEs:
      'Expresión musical y danzante de la comunidad afroboliviana de los Yungas paceños, descendientes ' +
      'de esclavos africanos traídos a trabajar en las minas. El ritmo lo marca un bombo que resuena ' +
      'como el doble latido del corazón. Las mujeres cantan mientras mueven caderas y hombros al unísono.',
    descripcionCorta:
      'Danza y canto de la comunidad afroboliviana de los Yungas. Herencia africana en el corazón andino.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'afroboliviano', 'yungas', 'musica'],
    destacado: false,
  },
  {
    id: 'tobas',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Los Tobas',
    departamento: 'Todo Bolivia',
    descripcionBaseEs:
      'Danza que honra a los guerreros del pueblo Toba, indígenas amazónicos que el Imperio Inca ' +
      'desplazó hacia el altiplano. Sus bailarines visten tocados de plumas multicolores y pintura ' +
      'corporal. Es una de las danzas más vistosas del Carnaval de Oruro y del Gran Poder.',
    descripcionCorta:
      'Tocados de plumas y pintura corporal en honor a los guerreros Toba. Danza amazónica en el altiplano.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'carnaval', 'amazonia', 'plumas'],
    destacado: false,
  },
  {
    id: 'llamerada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'La Llamerada',
    departamento: 'Oruro / La Paz',
    descripcionBaseEs:
      'Danza que rinde homenaje a los pastores de llamas del altiplano boliviano. Los bailarines ' +
      'visten atuendo andino tradicional y portan hondas y bofedales que recrean el pastoreo en la ' +
      'puna. Es una de las seis danzas consideradas patrimonio nacional boliviano.',
    descripcionCorta:
      'Homenaje a los pastores de llamas del altiplano. Patrimonio nacional con hondas y atuendo andino.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'altiplano', 'llama', 'patrimonio_nacional'],
    destacado: false,
  },
  {
    id: 'kullawada',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'La Kullawada',
    departamento: 'Oruro / La Paz',
    descripcionBaseEs:
      'Danza que representa a los artesanos del tejido del altiplano, llamados kullawas. Los bailarines ' +
      'portan ruecas y muestran la tradición textil aymara que viste al pueblo desde tiempos prehispánicos. ' +
      'Sus trajes son de colores vivos y sus pasos reflejan la cadencia del telar.',
    descripcionCorta:
      'Homenaje a los artesanos del tejido aymara. Ruecas y colores vivos que celebran la tradición textil.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'textil', 'aymara', 'artesania'],
    destacado: false,
  },
  {
    id: 'suri-sicuri',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Suri Sicuri',
    departamento: 'Oruro / La Paz',
    descripcionBaseEs:
      'Danza altiplánica cuyo nombre en aymara significa avestruz y músico de zampoña. Sus integrantes ' +
      'bailan con imponentes coronas de plumas de suri y tocan la zampoña en un movimiento circular ' +
      'continuo. Una de las danzas más antiguas del altiplano precolombino.',
    descripcionCorta:
      'Coronas de plumas de suri y zampoñas en movimiento circular. Una de las danzas más antiguas del altiplano.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'altiplano', 'zampoña', 'precolombino'],
    destacado: false,
  },
  {
    id: 'pujllay',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Pujllay de Tarabuco',
    departamento: 'Chuquisaca',
    descripcionBaseEs:
      'Fiesta y danza quechua de Tarabuco que conmemora la batalla de Jumbate de 1816, cuando los ' +
      'indígenas vencieron a las tropas españolas. Cada tercer domingo de marzo, los comunarios visten ' +
      'sus ropas ceremoniales para rendir homenaje a los caídos ante una Pukara cargada de ofrendas.',
    descripcionCorta:
      'Danza quechua que conmemora la victoria indígena sobre España en 1816. Pukara con ofrendas cada marzo.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'chuquisaca', 'quechua', 'historia'],
    destacado: false,
  },
  {
    id: 'macheteros',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Los Macheteros',
    departamento: 'Beni',
    descripcionBaseEs:
      'Danza sagrada del pueblo Baure del Beni. Sus danzantes visten túnica blanca sin cuello y ' +
      'portan machetes de madera tallada con plumas, coronados con majestuosos penachos de plumas de ' +
      'garza. Declarada Patrimonio Cultural del Estado Boliviano, es la danza más representativa de ' +
      'la Amazonia boliviana.',
    descripcionCorta:
      'Danza sagrada del pueblo Baure. Penachos de garza y machetes de madera tallada del Beni.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'beni', 'amazonia', 'sagrado'],
    destacado: false,
  },
  {
    id: 'taquirari',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'El Taquirari',
    departamento: 'Santa Cruz',
    descripcionBaseEs:
      'El género musical y danzante más popular del oriente boliviano. Ritmo alegre y contagioso ' +
      'de clara influencia indígena amazónica, tocado con violín, guitarra y arpa criolla. Es la ' +
      'música de las fiestas cruceñas y benianas, y su letra canta al amor, la naturaleza y la tierra oriental.',
    descripcionCorta:
      'El ritmo del oriente boliviano. Violín, guitarra y arpa criolla al son del amor y la tierra cruceña.',
    imagenUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    etiquetas: ['danza', 'musica', 'santa_cruz', 'oriente', 'folklore'],
    destacado: false,
  },
  {
    id: 'rueda-chapaca',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Rueda Chapaca',
    departamento: 'Tarija',
    descripcionBaseEs:
      'Danza vertiginosa y alegre del sur boliviano, ejecutada con zapateo rítmico y vestimenta ' +
      'colorida chapaca. Los bailarines forman ruedas que giran al compás del erque y el violín. ' +
      'Es la danza identitaria de Tarija y se presenta en todas las fiestas de la región del chaco boliviano.',
    descripcionCorta:
      'Ruedas giratorias con zapateo rítmico al erque y violín. La danza identitaria de Tarija.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'tarija', 'zapateo', 'musica'],
    destacado: false,
  },
  {
    id: 'waka-waka',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'Waka Waka',
    departamento: 'La Paz',
    descripcionBaseEs:
      'Danza burlesca que satiriza las corridas de toros españolas. Un bailarín vestido de toro ' +
      'enfrenta a los toreros en una parodia que mezcla humor y crítica social. Con décadas de ' +
      'historia en el Carnaval boliviano, es una de las danzas más queridas y divertidas del folklore.',
    descripcionCorta:
      'Parodia burlesca de las corridas de toros españolas. Humor y crítica social en el Carnaval boliviano.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'carnaval', 'humor', 'satirica'],
    destacado: false,
  },
  {
    id: 'chovena',
    tipo: 'patrimonio_inmaterial',
    categoria: 'danza_folklore',
    nombre: 'La Chovena',
    departamento: 'Santa Cruz / Pando',
    descripcionBaseEs:
      'Danza típica de la región chiquitana y del departamento de Pando. Se baila en carnavales ' +
      'con música de pífano de tacuara y percusión. Las parejas bailan tomadas de la mano con cadencia ' +
      'característica, y los danzantes lucen penachos de plumas y vestimenta de la región amazónica.',
    descripcionCorta:
      'Danza chiquitana con pífano de tacuara y penachos de plumas. Identidad amazónica en el carnaval.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['danza', 'folklore', 'santa_cruz', 'pando', 'amazonia'],
    destacado: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRADICIONES Y FESTIVIDADES
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'carnaval-oruro',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Carnaval de Oruro',
    departamento: 'Oruro',
    coordenadas: { lat: -17.9833, lng: -67.15 },
    descripcionBaseEs:
      'La festividad más grande de Bolivia, declarada Obra Maestra del Patrimonio Oral e Intangible ' +
      'de la Humanidad por la UNESCO en 2001. Más de 50 fraternidades y 28.000 bailarines desfilan ' +
      'durante 20 horas al ritmo de bandas de bronce en una mezcla de fe, folklore y arte andino.',
    descripcionCorta:
      'Patrimonio UNESCO. 28.000 bailarines y 20 horas de desfile de fe y folklore andino.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'carnaval', 'patrimonio_unesco', 'danza', 'musica', 'oruro'],
    destacado: true,
  },
  {
    id: 'alasitas',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Feria de las Alasitas',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5, lng: -68.15 },
    descripcionBaseEs:
      'Festividad del 24 de enero dedicada a Ekeko, el dios aymara de la abundancia. Los paceños ' +
      'compran miniaturas de todo lo que desean lograr ese año — casas, autos, diplomas, pasaportes — ' +
      'y las bendicen con un yatiri al mediodía en un ritual que fusiona la espiritualidad andina con ' +
      'los sueños modernos.',
    descripcionCorta:
      'Miniaturas de deseos bendecidas por un yatiri el 24 de enero. La magia aymara en La Paz.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'tradicion', 'cultura_aymara', 'mercado', 'artesania', 'espiritualidad'],
    destacado: true,
  },
  {
    id: 'urkupiña',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Festividad de la Virgen de Urkupiña',
    departamento: 'Cochabamba',
    coordenadas: { lat: -17.4, lng: -66.25 },
    descripcionBaseEs:
      'Festividad de agosto en Quillacollo que congrega más de 500.000 peregrinos de todo el país. ' +
      'La peregrinación al cerro de Cota incluye el ritual de romper piedras para pedir deseos a la ' +
      'Virgen. Combina la fe católica con tradiciones andinas en la manifestación religiosa más masiva de Bolivia.',
    descripcionCorta:
      '500.000 peregrinos en agosto en Quillacollo. El ritual de las piedras para pedir deseos a la Virgen.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'religion', 'peregrinacion', 'cochabamba', 'virgen'],
    destacado: true,
  },
  {
    id: 'gran-poder',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Festividad del Señor del Gran Poder',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5, lng: -68.15 },
    descripcionBaseEs:
      'La entrada folklórica más grande de La Paz, celebrada entre mayo y junio. Más de 40.000 ' +
      'bailarines recorren las calles del centro paceño durante 16 horas seguidas. Declarada ' +
      'Patrimonio Inmaterial de la Humanidad por la UNESCO en 2019, es expresión del ascenso social ' +
      'y orgullo cultural aymara urbano.',
    descripcionCorta:
      'Patrimonio UNESCO 2019. 40.000 bailarines recorren La Paz durante 16 horas de folklore.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['festividad', 'patrimonio_unesco', 'la_paz', 'danza', 'aymara'],
    destacado: true,
  },
  {
    id: 'inti-raymi',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Inti Raymi — Año Nuevo Andino',
    departamento: 'La Paz',
    coordenadas: { lat: -16.5547, lng: -68.6736 },
    descripcionBaseEs:
      'Ceremonia del solsticio de invierno el 21 de junio que marca el Año Nuevo Andino-Amazónico. ' +
      'En Tiwanaku, miles de personas reciben los primeros rayos del sol con las manos abiertas y ' +
      'ofrendas a la Pachamama. Celebración precolombina recuperada y declarada feriado nacional desde 2009.',
    descripcionCorta:
      'Año Nuevo Andino el 21 de junio en Tiwanaku. Miles reciben el sol con las manos abiertas.',
    imagenUrl: 'https://images.unsplash.com/photo-1589650381083-5d08a59f49cf?w=800&q=80',
    etiquetas: ['festividad', 'espiritualidad', 'tiwanaku', 'solsticio', 'pachamama'],
    destacado: false,
  },
  {
    id: 'todos-santos',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Todos Santos — Día de los Difuntos',
    departamento: 'Todo Bolivia',
    descripcionBaseEs:
      'Los días 1 y 2 de noviembre las familias bolivianas reciben el alma de sus muertos con mesas ' +
      'de ofrendas cargadas de comidas favoritas, frutas, pan en formas de escaleras y muñecos. Las ' +
      'tumbas se decoran con flores y se pasa la noche velando con música y comida en los cementerios.',
    descripcionCorta:
      'Mesas de ofrendas para las almas el 1 y 2 de noviembre. Una noche entera con los difuntos en Bolivia.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'tradicion', 'difuntos', 'familia', 'espiritualidad'],
    destacado: false,
  },
  {
    id: 'candelaria-copacabana',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Virgen de la Candelaria',
    departamento: 'La Paz',
    coordenadas: { lat: -16.1667, lng: -69.0833 },
    descripcionBaseEs:
      'Celebración del 2 de febrero en Copacabana en honor a la patrona de Bolivia. Miles de ' +
      'peregrinos llegan desde Chile, Perú y Argentina para bendecir sus vehículos en la plaza del ' +
      'santuario — una tradición única donde el sacerdote rocía con cerveza y serpentinas los ' +
      'automóviles recién estrenados.',
    descripcionCorta:
      'Bendición de vehículos con cerveza y serpentinas el 2 de febrero en Copacabana. Tradición única en el mundo.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'religion', 'peregrinacion', 'copacabana', 'bendicion'],
    destacado: false,
  },
  {
    id: 'carnaval-tarabuco',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Carnaval de Tarabuco — Pujllay',
    departamento: 'Chuquisaca',
    coordenadas: { lat: -19.1667, lng: -64.9167 },
    descripcionBaseEs:
      'El tercer domingo de marzo, los comunarios quechuas de Tarabuco se visten con sus ropas ' +
      'ceremoniales para celebrar el Pujllay. La Pukara — altar cargado de productos agrícolas, ' +
      'carnes y bebidas — preside el festejo que recuerda la victoria sobre los colonizadores ' +
      'españoles en 1816.',
    descripcionCorta:
      'Pukara cargada de ofrendas y ropas ceremoniales quechuas cada marzo en Tarabuco.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'carnaval', 'quechua', 'chuquisaca', 'historia'],
    destacado: false,
  },
  {
    id: 'san-ignacio-moxos',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Ichapekene Piesta — San Ignacio de Moxos',
    departamento: 'Beni',
    coordenadas: { lat: -14.9833, lng: -65.65 },
    descripcionBaseEs:
      'La festividad más importante de los pueblos indígenas del Beni, declarada Patrimonio Inmaterial ' +
      'de la Humanidad por la UNESCO en 2012. Se celebra en julio en San Ignacio de Moxos con danzas ' +
      'de jaguares, macheteros y músicos que tocan flautas de tacuara de dos metros de longitud.',
    descripcionCorta:
      'Patrimonio UNESCO 2012. Danzas de jaguares y flautas de dos metros en San Ignacio de Moxos.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'patrimonio_unesco', 'beni', 'amazonia', 'indigena'],
    destacado: false,
  },
  {
    id: 'chutillos',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Festividad de Ch\'utillos',
    departamento: 'Potosí',
    descripcionBaseEs:
      'Festividad potosina de fin de agosto en honor a San Bartolomé, que según la leyenda local ' +
      'venció al diablo en la quebrada de La Puerta. Fusión única de tradición prehispánica colla ' +
      'y devoción cristiana colonial, con entrada folklórica de danzas que representan la identidad ' +
      'minera de Potosí.',
    descripcionCorta:
      'San Bartolomé vence al diablo en Potosí. Fusión de tradición colla y devoción colonial.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['festividad', 'religion', 'potosi', 'minero', 'folklore'],
    destacado: false,
  },
  {
    id: 'virgen-guadalupe-sucre',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Entrada de la Virgen de Guadalupe',
    departamento: 'Chuquisaca',
    coordenadas: { lat: -19.0478, lng: -65.2596 },
    descripcionBaseEs:
      'Una de las fiestas folclóricas más importantes de Bolivia, celebrada en septiembre en Sucre. ' +
      'Convoca a más de 40.000 bailarines de todo el país en honor a la patrona de Chuquisaca. ' +
      'La festividad fue inscrita en la Lista del Patrimonio Inmaterial de la Humanidad de la ' +
      'UNESCO en 2025.',
    descripcionCorta:
      'Patrimonio UNESCO 2025. 40.000 bailarines en Sucre honran a la patrona de Chuquisaca en septiembre.',
    imagenUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
    etiquetas: ['festividad', 'patrimonio_unesco', 'chuquisaca', 'danza', 'religion'],
    destacado: false,
  },
  {
    id: 'anata-andino',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Anata Andino',
    departamento: 'Oruro',
    descripcionBaseEs:
      'Festividad agraria precolombina que se celebra el jueves anterior al Carnaval de Oruro. Las ' +
      'comunidades andinas bajan a la ciudad con sus productos agrícolas, flores y trajes ceremoniales ' +
      'para agradecer a la Pachamama por las cosechas del año. Es el carnaval de las comunidades ' +
      'originarias del altiplano.',
    descripcionCorta:
      'El carnaval agrario precolombino del altiplano. Agradecimiento a la Pachamama con productos y trajes.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'carnaval', 'oruro', 'pachamama', 'agricultura'],
    destacado: false,
  },
  {
    id: 'carnaval-cruceño',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Carnaval Cruceño — La Fiesta Grande',
    departamento: 'Santa Cruz',
    descripcionBaseEs:
      'El carnaval más tropical de Bolivia, celebrado en Santa Cruz de la Sierra con comparsas, ' +
      'reinas y música de taquirari. Diferente al carnaval andino, tiene una fuerte influencia ' +
      'caribeña y brasileña. Las corsos y cabalgatas llenan de color y alegría las calles de la ' +
      'capital oriental durante varios días.',
    descripcionCorta:
      'El carnaval más tropical de Bolivia con taquirari, reinas y comparsas en Santa Cruz.',
    imagenUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    etiquetas: ['festividad', 'carnaval', 'santa_cruz', 'musica', 'tropical'],
    destacado: false,
  },
  {
    id: 'pachamama',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Ch\'alla a la Pachamama',
    departamento: 'Todo Bolivia',
    descripcionBaseEs:
      'Rito andino de ofrenda y agradecimiento a la Madre Tierra que se celebra durante el Carnaval ' +
      'y cada primer viernes de agosto. Se riega la tierra y los objetos con cerveza, vino o chicha; ' +
      'se queman incienso, hojas de coca y pastillas de colores como ofrenda. Tradición viva en todo el país.',
    descripcionCorta:
      'Ofrenda de cerveza y coca a la Madre Tierra cada agosto y en Carnaval. Tradición viva en todo Bolivia.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'tradicion', 'pachamama', 'ritual', 'espiritualidad'],
    destacado: false,
  },
  {
    id: 'festival-barroco-misiones',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Festival Internacional de Música Barroca',
    departamento: 'Santa Cruz',
    coordenadas: { lat: -16.3333, lng: -60.9667 },
    descripcionBaseEs:
      'Festival bienal celebrado en la Chiquitanía, donde las misiones jesuíticas conservan la mayor ' +
      'colección de música barroca de Sudamérica. Músicos de todo el mundo tocan en las catedrales del ' +
      'siglo XVII de San Javier, Concepción y Santa Ana, en lo que se considera el evento cultural más ' +
      'importante de Bolivia.',
    descripcionCorta:
      'El evento cultural más importante de Bolivia. Música barroca mundial en catedrales del siglo XVII.',
    imagenUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    etiquetas: ['festividad', 'musica', 'barroco', 'santa_cruz', 'misiones'],
    destacado: false,
  },
  {
    id: 'san-roque-tarija',
    tipo: 'patrimonio_inmaterial',
    categoria: 'tradicion_festividad',
    nombre: 'Fiesta de San Roque',
    departamento: 'Tarija',
    descripcionBaseEs:
      'La fiesta más auténtica del sur boliviano, celebrada en agosto y septiembre en Tarija en honor ' +
      'al santo protector de los enfermos. Procesiones religiosas, música chapaca en vivo y la danza ' +
      'de los Chunchos — con indumentaria de colores y tocados de plumas — hacen de esta festividad ' +
      'la más querida de la región.',
    descripcionCorta:
      'La fiesta más auténtica del sur boliviano. Música chapaca y Chunchos con plumas en Tarija.',
    imagenUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80',
    etiquetas: ['festividad', 'religion', 'tarija', 'musica', 'danza'],
    destacado: false,
  },
]
