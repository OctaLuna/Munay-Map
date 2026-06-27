import { Injectable } from '@nestjs/common';
import type {
  GeminiServicePort,
  GeminiExplanationRequest,
  GeminiExplanationResult,
  GeminiChatRequest,
  GeminiChatResult,
} from './gemini.service.interface';

@Injectable()
export class GeminiServiceMock implements GeminiServicePort {
  // eslint-disable-next-line @typescript-eslint/require-await
  async generateExplanation(
    request: GeminiExplanationRequest,
  ): Promise<GeminiExplanationResult> {
    const siteName = request.site?.nombre ?? 'este sitio cultural';
    return {
      explicacion:
        `[MOCK] ${siteName} es un importante sitio del patrimonio boliviano. ` +
        `Esta es una explicacion generada en modo mock para el idioma "${request.idioma}". ` +
        `En produccion, Gemini generaria una descripcion rica, precisa y adaptada culturalmente.`,
      idioma: request.idioma,
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async chat(request: GeminiChatRequest): Promise<GeminiChatResult> {
    return {
      respuesta:
        `[MOCK] Respuesta a tu pregunta sobre patrimonio boliviano: "${request.pregunta}". ` +
        `Esta es una respuesta generada en modo mock para el idioma "${request.idioma}".`,
      idioma: request.idioma,
    };
  }
}
