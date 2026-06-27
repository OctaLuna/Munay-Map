import type { QuizQuestion } from '@/types'

/**
 * 9 preguntas del quiz "Tu Guía Personalizada"
 * Las etiquetas de cada opción se usan para hacer tag-matching con Site.etiquetas
 *
 * Nota: estas preguntas están sincronizadas con backend/data/quizQuestions.json
 * Solo se usan cuando USE_MOCK_DATA=true (desarrollo sin backend).
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    orden: 1,
    pregunta: '¿Qué tipo de paisaje te atrae más?',
    opciones: [
      {
        id: 'q1-a',
        texto: 'Altiplano y volcanes',
        etiquetas: ['altiplano', 'naturaleza', 'paisaje'],
      },
      {
        id: 'q1-b',
        texto: 'Selva amazónica y biodiversidad',
        etiquetas: ['amazonia', 'naturaleza', 'biodiversidad'],
      },
      {
        id: 'q1-c',
        texto: 'Ciudades coloniales y arquitectura',
        etiquetas: ['historia', 'arquitectura', 'ciudad'],
      },
      {
        id: 'q1-d',
        texto: 'Salares y desiertos únicos',
        etiquetas: ['paisaje', 'fotografia', 'unico_en_el_mundo'],
      },
    ],
  },
  {
    id: 'q2',
    orden: 2,
    pregunta: '¿Qué actividad preferís hacer en tus viajes?',
    opciones: [
      {
        id: 'q2-a',
        texto: 'Explorar ruinas y museos',
        etiquetas: ['arqueologia', 'historia', 'cultura'],
      },
      {
        id: 'q2-b',
        texto: 'Disfrutar la gastronomía local',
        etiquetas: ['gastronomia', 'cocina_andina', 'picante'],
      },
      {
        id: 'q2-c',
        texto: 'Participar en festividades y danzas',
        etiquetas: ['festividad', 'folklore', 'musica'],
      },
      {
        id: 'q2-d',
        texto: 'Aventura y contacto con la naturaleza',
        etiquetas: ['aventura', 'ecoturismo', 'naturaleza'],
      },
    ],
  },
  {
    id: 'q3',
    orden: 3,
    pregunta: '¿Qué es lo que más valorás en un viaje?',
    opciones: [
      {
        id: 'q3-a',
        texto: 'Aprender historia y cultura local',
        etiquetas: ['historia', 'cultura', 'patrimonio_unesco'],
      },
      {
        id: 'q3-b',
        texto: 'Desconectarme en la naturaleza',
        etiquetas: ['naturaleza', 'relax', 'paisaje'],
      },
      {
        id: 'q3-c',
        texto: 'Vivir experiencias únicas en el mundo',
        etiquetas: ['unico_en_el_mundo', 'aventura', 'fotografia'],
      },
      {
        id: 'q3-d',
        texto: 'Conectar con espiritualidad y tradiciones',
        etiquetas: ['espiritualidad', 'cultura_aymara', 'tradicion'],
      },
    ],
  },
  {
    id: 'q4',
    orden: 4,
    pregunta: '¿Cómo describirías tu estilo de viaje?',
    opciones: [
      {
        id: 'q4-a',
        texto: 'Mochilero aventurero',
        etiquetas: ['aventura', 'naturaleza', 'ecoturismo'],
      },
      {
        id: 'q4-b',
        texto: 'Fotógrafo viajero',
        etiquetas: ['fotografia', 'paisaje', 'unico_en_el_mundo'],
      },
      {
        id: 'q4-c',
        texto: 'Turista cultural e histórico',
        etiquetas: ['cultura', 'historia', 'patrimonio_unesco'],
      },
      {
        id: 'q4-d',
        texto: 'Explorador gastronómico',
        etiquetas: ['gastronomia', 'tradicion', 'cocina_andina'],
      },
    ],
  },
  {
    id: 'q5',
    orden: 5,
    pregunta: '¿Con quién viajás normalmente?',
    opciones: [
      {
        id: 'q5-a',
        texto: 'Solo/a — libertad total',
        etiquetas: ['aventura', 'espiritualidad', 'fotografia'],
      },
      {
        id: 'q5-b',
        texto: 'En pareja — experiencias románticas',
        etiquetas: ['paisaje', 'relax', 'unico_en_el_mundo'],
      },
      {
        id: 'q5-c',
        texto: 'Con familia — actividades para todos',
        etiquetas: ['cultura', 'historia', 'festividad'],
      },
      {
        id: 'q5-d',
        texto: 'Con amigos — diversión y grupos',
        etiquetas: ['festividad', 'aventura', 'folklore'],
      },
    ],
  },
  {
    id: 'q6',
    orden: 6,
    pregunta: '¿Cuál es tu presupuesto aproximado por día?',
    opciones: [
      {
        id: 'q6-a',
        texto: 'Económico (hasta $30 USD/día)',
        etiquetas: ['mercado', 'tradicion', 'naturaleza'],
      },
      {
        id: 'q6-b',
        texto: 'Moderado ($30–$80 USD/día)',
        etiquetas: ['cultura', 'gastronomia', 'aventura'],
      },
      {
        id: 'q6-c',
        texto: 'Cómodo ($80–$150 USD/día)',
        etiquetas: ['paisaje', 'historia', 'arqueologia'],
      },
      {
        id: 'q6-d',
        texto: 'Premium (más de $150 USD/día)',
        etiquetas: ['unico_en_el_mundo', 'relax', 'fotografia'],
      },
    ],
  },
  {
    id: 'q7',
    orden: 7,
    pregunta: '¿En qué horario preferís explorar?',
    opciones: [
      {
        id: 'q7-a',
        texto: 'Mañana temprano — luz perfecta y tranquilidad',
        etiquetas: ['fotografia', 'naturaleza', 'altiplano'],
      },
      {
        id: 'q7-b',
        texto: 'A pleno día — máxima energía',
        etiquetas: ['aventura', 'arqueologia', 'historia'],
      },
      {
        id: 'q7-c',
        texto: 'Tarde — ritmo relajado y atardeceres',
        etiquetas: ['relax', 'paisaje', 'unico_en_el_mundo'],
      },
      {
        id: 'q7-d',
        texto: 'Noche — vida nocturna y festividades',
        etiquetas: ['festividad', 'musica', 'folklore'],
      },
    ],
  },
  {
    id: 'q8',
    orden: 8,
    pregunta: '¿Qué tipo de comida preferís?',
    opciones: [
      {
        id: 'q8-a',
        texto: 'Comida tradicional andina (chuño, quinua, llajwa)',
        etiquetas: ['cocina_andina', 'gastronomia', 'tradicion'],
      },
      {
        id: 'q8-b',
        texto: 'Picante y con sabor boliviano auténtico',
        etiquetas: ['picante', 'gastronomia', 'cocina_boliviana'],
      },
      {
        id: 'q8-c',
        texto: 'Me aventuro con cualquier cosa local',
        etiquetas: ['gastronomia', 'aventura', 'mercado'],
      },
      {
        id: 'q8-d',
        texto: 'Prefiero opciones más conocidas',
        etiquetas: ['relax', 'cultura', 'historia'],
      },
    ],
  },
  {
    id: 'q9',
    orden: 9,
    pregunta: '¿Qué temporada preferís para viajar?',
    opciones: [
      {
        id: 'q9-a',
        texto: 'Verano (dic–mar, lluvias y Salar con efecto espejo)',
        etiquetas: ['naturaleza', 'paisaje', 'fotografia'],
      },
      {
        id: 'q9-b',
        texto: 'Invierno (jun–ago, temporada seca y cielos despejados)',
        etiquetas: ['arqueologia', 'altiplano', 'aventura'],
      },
      {
        id: 'q9-c',
        texto: 'Carnaval (feb–mar, el mayor espectáculo folclórico)',
        etiquetas: ['carnaval', 'danza', 'festividad'],
      },
      {
        id: 'q9-d',
        texto: 'Me adapto — cualquier época está bien',
        etiquetas: ['cultura', 'historia', 'relax'],
      },
    ],
  },
]
