import type { Dict } from '@/i18n'

/** Diccionario de origen (Español). Toda clave nueva se define primero aquí. */
export const es: Dict = {
  // ─── Navbar ───────────────────────────────────────────────────────────────
  'nav.home': 'Inicio',
  'nav.library': 'Biblioteca',
  'nav.guide': 'Tu Guía Personalizada',
  'nav.tryCamera': 'Probar la cámara',
  'nav.openMenu': 'Abrir menú',
  'nav.closeMenu': 'Cerrar menú',
  'nav.aria.primary': 'Navegación principal',
  'nav.aria.mobile': 'Menú móvil',
  'nav.aria.brand': 'Munay Map — Inicio',
  'nav.aria.language': 'Seleccionar idioma',
  'nav.language.search': 'Buscar idioma...',
  'nav.language.searchLabel': 'Buscar idioma',
  'nav.language.empty': 'Sin resultados',
  'nav.language.available': 'Idiomas disponibles',

  // ─── Footer ─────────────────────────────────────────────────────────────────
  'footer.tagline':
    'Guía turística multiidioma potenciada por inteligencia artificial. Explorá Bolivia como nunca antes.',
  'footer.legal': 'Información legal · Contacto',
  'footer.navHeading': 'Navegación',
  'footer.poweredBy': 'Potenciado por',
  'footer.aria.nav': 'Navegación del pie',
  'footer.link.home': 'Inicio',
  'footer.link.library': 'Biblioteca',
  'footer.link.quiz': 'Quiz',
  'footer.link.about': 'Sobre nosotros',
  'footer.link.camera': 'Probar cámara',
  'footer.copyright': 'Proyecto académico',
  'footer.madeWith': 'Hecho con cariño para los 9 departamentos de Bolivia',

  // ─── Home: problema ─────────────────────────────────────────────────────────
  'home.problem.title': 'El problema que resolvemos',
  'home.problem.body':
    'Bolivia tiene un patrimonio cultural inmenso, pero la barrera del idioma y la falta de guías especializados impiden que los turistas internacionales accedan a la riqueza de cada lugar. Munay Map elimina esa barrera: cualquier turista, en cualquier idioma, puede entender la historia que tiene frente a sus ojos.',

  // ─── Home: marquees ─────────────────────────────────────────────────────────
  'home.tech.aria': 'Tecnologías utilizadas',
  'home.tech.vision': 'Reconocimiento de imágenes',
  'home.tech.gemini': 'Explicaciones generadas por IA',
  'home.tech.tts': 'Audio en tu idioma',
  'home.tech.cloud': 'Infraestructura en la nube',
  'home.depts.aria': 'Departamentos de Bolivia',

  // ─── Home: CTA final ────────────────────────────────────────────────────────
  'home.cta.title': 'No sabés por dónde empezar',
  'home.cta.body':
    'Respondé unas preguntas y recibís un itinerario personalizado con los sitios, sabores y experiencias que van con tu estilo de viaje.',
  'home.cta.button': 'Empezar el quiz — 2 minutos',

  // ─── Hero ───────────────────────────────────────────────────────────────────
  'hero.title': 'Bolivia tiene mil historias que contar.',
  'hero.subtitle':
    'Explorá su patrimonio cultural con inteligencia artificial. Reconocé sitios, entendé su historia en tu idioma y descubrí tu viaje ideal.',
  'hero.cta.discover': 'Descubrir',
  'hero.cta.quiz': 'Hacer el quiz',
  'hero.scroll': 'Explorar',

  // ─── Sección cinematográfica ────────────────────────────────────────────────
  'cinematic.eyebrow': 'Un solo gesto',
  'cinematic.title': 'Viaja sin barreras de idioma',
  'cinematic.body':
    'Apuntá la cámara a un templo, una danza o un plato y recibí su historia narrada en tu idioma. La distancia entre vos y la cultura boliviana se reduce a una fotografía.',
  'cinematic.ghost': 'Patrimonio vivo',

  // ─── Pasos / Cómo funciona ──────────────────────────────────────────────────
  'steps.title': 'Cómo funciona',
  'steps.subtitle':
    'Cuatro pasos para convertir cualquier rincón de Bolivia en una experiencia de aprendizaje.',
  'steps.1.title': 'Tomás una foto',
  'steps.1.desc':
    'Apuntá tu cámara a cualquier sitio cultural, monumento, plato típico o elemento de una festividad boliviana.',
  'steps.2.title': 'Identificamos el lugar',
  'steps.2.desc':
    'Nuestra IA analiza la imagen en segundos y la compara con nuestra base de datos cultural boliviana.',
  'steps.3.title': 'Te explicamos su historia',
  'steps.3.desc':
    'Recibís una explicación detallada generada por IA: origen, significado cultural, datos curiosos y recomendaciones.',
  'steps.4.title': 'Lo escuchás en tu idioma',
  'steps.4.desc':
    'La explicación se traduce y narra en tu idioma preferido entre 40 disponibles. Tecnología Text-to-Speech de Google Cloud.',

  // ─── Dos columnas ───────────────────────────────────────────────────────────
  'twocol.aria': 'Lugares y sabores de Bolivia',
  'twocol.places.title': 'Lugares para explorar',
  'twocol.places.body':
    'Desde las ruinas milenarias de Tiwanaku hasta el infinito Salar de Uyuni.',
  'twocol.flavors.title': 'Sabores para descubrir',
  'twocol.flavors.body':
    'El chuño lleva 2.000 años en el altiplano. El salteño, el silpancho, el tucumán.',
  'twocol.explore': 'Explorar',

  // ─── Estadísticas ───────────────────────────────────────────────────────────
  'stats.aria': 'Estadísticas del proyecto',
  'stats.sites': 'Sitios catalogados',
  'stats.depts': 'Departamentos',
  'stats.langs': 'Idiomas disponibles',
  'stats.years': 'Años de historia',

  // ─── Editorial ──────────────────────────────────────────────────────────────
  'editorial.title': 'Tecnología al servicio de la cultura',
  'editorial.p1':
    'Munay Map combina Vision AI para reconocer sitios culturales en tiempo real, Gemini para generar explicaciones ricas y culturalmente precisas, y Text-to-Speech para narrarlas en más de 40 idiomas. Todo desde la cámara del teléfono del turista.',
  'editorial.p2':
    'El patrimonio boliviano abarca más de 2.000 años de historia: desde las ruinas precolombinas de Tiwanaku hasta los carnavales declarados Patrimonio de la Humanidad por la UNESCO. Munay Map hace que cada uno de esos lugares sea accesible para cualquier turista del mundo.',
  'editorial.quote':
    '"Cualquier turista, en cualquier idioma, puede entender la historia que tiene frente a sus ojos."',

  // ─── Testimonios ────────────────────────────────────────────────────────────
  'testimonials.title': 'Lo que dicen los viajeros',
  'testimonials.subtitle': 'Testimonios ilustrativos de la experiencia Munay Map',
  'testimonials.aria.region': 'Carrusel de testimoniales',
  'testimonials.aria.prev': 'Testimonio anterior',
  'testimonials.aria.next': 'Siguiente testimonio',
  'testimonials.aria.dots': 'Navegar entre testimonios',
  'testimonials.aria.item': 'Testimonio {n}',
  'testimonials.t1.text':
    '"Llegué a Tiwanaku sin saber nada sobre el lugar. Tomé una foto con la app y en segundos tenía toda la historia en japonés. Increíble."',
  'testimonials.t1.country': 'Japón',
  'testimonials.t2.text':
    '"El quiz me recomendó el Salar de Uyuni y el Carnaval de Oruro. Hice los dos y fue el viaje más memorable de mi vida."',
  'testimonials.t2.country': 'Argentina',
  'testimonials.t3.text':
    '"Viajé con mi familia y los chicos quedaron fascinados escuchando las historias en su idioma. La herramienta es perfecta para turistas con niños."',
  'testimonials.t3.country': 'Alemania',

  // ─── Quiz: flujo ────────────────────────────────────────────────────────────
  'quiz.flow.loading': 'Cargando preguntas del quiz...',
  'quiz.flow.progress': 'Pregunta {current} de {total}',
  'quiz.flow.back': '← Anterior',
  'quiz.flow.next': 'Siguiente →',
  'quiz.flow.finish': 'Ver mi recomendación',
  'quiz.flow.prevAria': 'Pregunta anterior',

  // ─── Quiz: resultado ────────────────────────────────────────────────────────
  'quiz.result.eyebrow': 'Tu guía personalizada',
  'quiz.result.summaryFallback':
    'Basándome en tus respuestas, esta es la Bolivia hecha a tu medida.',
  'quiz.result.interestsAria': 'Tus intereses',
  'quiz.result.print': 'Imprimir / guardar mi guía',
  'quiz.result.summaryAria': 'Resumen del viaje',
  'quiz.result.duration': 'Duración sugerida',
  'quiz.result.day': 'día',
  'quiz.result.days': 'días',
  'quiz.result.bestSeason': 'Mejor época',
  'quiz.result.itinerary.title': 'Tu itinerario optimizado',
  'quiz.result.itinerary.subtitle':
    'Un recorrido día por día pensado para tu perfil, ordenado para minimizar traslados entre regiones.',
  'quiz.result.dayLabel': 'Día',
  'quiz.result.viewInLibrary': 'Ver {name} en la biblioteca',
  'quiz.result.row.eat': 'Para comer',
  'quiz.result.row.live': 'Para vivir',
  'quiz.result.row.tip': 'Consejo',
  'quiz.result.places.title': 'Lugares para vos',
  'quiz.result.places.sub': 'Sitios turísticos que coinciden con tu estilo de viaje',
  'quiz.result.food.title': 'Qué tenés que probar',
  'quiz.result.food.sub': 'La gastronomía boliviana que vas a adorar',
  'quiz.result.food.badge': 'Gastronomía',
  'quiz.result.exp.title': 'Qué tenés que vivir',
  'quiz.result.exp.sub': 'Danzas, festivales y tradiciones que van con tu espíritu',
  'quiz.result.exp.dance': 'Danza',
  'quiz.result.exp.festivity': 'Festividad',
  'quiz.result.tips.title': 'Consejos para tu viaje',
  'quiz.result.tips.sub': 'Tips prácticos seleccionados especialmente para tu perfil',
  'quiz.result.cta.text': '¿Querés explorar más opciones o repetir el quiz?',
  'quiz.result.cta.library': 'Explorar la Biblioteca completa',
  'quiz.result.cta.repeat': 'Repetir el quiz',

  // ─── Común / 404 ────────────────────────────────────────────────────────────
  'common.skipToContent': 'Ir al contenido principal',
  'notfound.title': 'Página no encontrada',
  'notfound.body': 'La página que buscás no existe.',
  'notfound.back': 'Volver al inicio',
}
