export interface QuizOption {
  id: string;
  texto: string;
  etiquetas: string[];
}

export interface QuizQuestion {
  id: string;
  orden: number;
  pregunta: string;
  opciones: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  etiquetas: string[];
}
