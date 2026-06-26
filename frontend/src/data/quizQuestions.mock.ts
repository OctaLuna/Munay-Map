import type { QuizQuestion } from '@/types'

/**
 * 6 preguntas del quiz de recomendación de viaje
 * Las etiquetas de cada opción se usan para hacer tag-matching con Site.etiquetas
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-tipo-viajero',
    orden: 1,
    pregunta: '¿Qué tipo de viajero eres?',
    opciones: [
      {
        id: 'aventurero',
        texto: 'Aventurero — me gustan los desafíos y la adrenalina',
        etiquetas: ['aventura', 'naturaleza', 'fotografia'],
      },
      {
        id: 'cultural',
        texto: 'Cultural e histórico — me apasiona aprender sobre el pasado',
        etiquetas: ['historia', 'cultura', 'arqueologia', 'patrimonio_unesco'],
      },
      {
        id: 'relax',
        texto: 'Relax y naturaleza — quiero desconectarme y disfrutar',
        etiquetas: ['relax', 'naturaleza', 'paisaje'],
      },
      {
        id: 'gastronomico',
        texto: 'Gastronómico — viajo para descubrir sabores nuevos',
        etiquetas: ['gastronomia', 'cocina_andina', 'mercado'],
      },
    ],
  },
  {
    id: 'q2-tiempo',
    orden: 2,
    pregunta: '¿Cuánto tiempo tenés disponible para tu viaje?',
    opciones: [
      {
        id: '1-3-dias',
        texto: '1 a 3 días — escapada corta',
        etiquetas: ['cultura', 'festividad'],
      },
      {
        id: '4-7-dias',
        texto: '4 a 7 días — una semana bien aprovechada',
        etiquetas: ['historia', 'naturaleza', 'aventura'],
      },
      {
        id: 'mas-semana',
        texto: 'Más de una semana — quiero verlo todo',
        etiquetas: ['arqueologia', 'patrimonio_unesco', 'paisaje', 'unico_en_el_mundo'],
      },
    ],
  },
  {
    id: 'q3-clima',
    orden: 3,
    pregunta: '¿Qué clima preferís para tu viaje?',
    opciones: [
      {
        id: 'frio-altura',
        texto: 'Frío de altura — aire puro y cielos despejados',
        etiquetas: ['altiplano', 'arqueologia', 'fotografia'],
      },
      {
        id: 'calido-tropical',
        texto: 'Cálido y tropical — biodiversidad y selva',
        etiquetas: ['naturaleza', 'aventura', 'relax'],
      },
      {
        id: 'templado',
        texto: 'Templado — ni mucho frío ni mucho calor',
        etiquetas: ['cultura', 'historia', 'gastronomia'],
      },
    ],
  },
  {
    id: 'q4-comida',
    orden: 4,
    pregunta: '¿Qué tipo de comida te genera más curiosidad?',
    opciones: [
      {
        id: 'picante',
        texto: 'Picante — me encanta el sabor intenso',
        etiquetas: ['gastronomia', 'picante', 'cocina_andina'],
      },
      {
        id: 'dulce',
        texto: 'Dulce — postres, frutas y sabores suaves',
        etiquetas: ['gastronomia', 'mercado'],
      },
      {
        id: 'andina-tradicional',
        texto: 'Tradicional andina — recetas milenarias',
        etiquetas: ['gastronomia', 'cocina_andina', 'tradicion', 'cultura_aymara'],
      },
      {
        id: 'todo',
        texto: 'De todo un poco — soy un explorador culinario',
        etiquetas: ['gastronomia', 'mercado', 'tradicion'],
      },
    ],
  },
  {
    id: 'q5-actividad',
    orden: 5,
    pregunta: '¿Qué actividad te llama más la atención?',
    opciones: [
      {
        id: 'ruinas',
        texto: 'Recorrer ruinas y sitios arqueológicos',
        etiquetas: ['arqueologia', 'historia', 'patrimonio_unesco', 'altiplano'],
      },
      {
        id: 'naturaleza-extrema',
        texto: 'Trekking, senderismo o deportes extremos',
        etiquetas: ['aventura', 'naturaleza', 'unico_en_el_mundo'],
      },
      {
        id: 'festivales',
        texto: 'Festivales, música y danza tradicional',
        etiquetas: ['festividad', 'danza', 'folklore', 'carnaval', 'musica'],
      },
      {
        id: 'mercados',
        texto: 'Mercados, artesanías y cultura local',
        etiquetas: ['artesania', 'mercado', 'tradicion', 'cultura_aymara'],
      },
    ],
  },
  {
    id: 'q6-compania',
    orden: 6,
    pregunta: '¿Con quién viajás?',
    opciones: [
      {
        id: 'solo',
        texto: 'Solo — quiero mi propio ritmo',
        etiquetas: ['aventura', 'espiritualidad', 'fotografia'],
      },
      {
        id: 'pareja',
        texto: 'En pareja — buscamos momentos únicos juntos',
        etiquetas: ['paisaje', 'relax', 'unico_en_el_mundo'],
      },
      {
        id: 'familia',
        texto: 'Con familia — incluyendo niños',
        etiquetas: ['cultura', 'historia', 'festividad'],
      },
      {
        id: 'grupo',
        texto: 'Con grupo de amigos — cuantos más, mejor',
        etiquetas: ['carnaval', 'folklore', 'aventura', 'danza'],
      },
    ],
  },
]
