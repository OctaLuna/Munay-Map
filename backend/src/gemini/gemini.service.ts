import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import type {
  GeminiServicePort,
  GeminiExplanationRequest,
  GeminiExplanationResult,
  GeminiChatRequest,
  GeminiChatResult,
} from './gemini.service.interface';

@Injectable()
export class GeminiService implements GeminiServicePort {
  private readonly logger = new Logger(GeminiService.name);
  private readonly ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY is required when GOOGLE_CLOUD_MOCK_MODE=false',
      );
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateExplanation(
    request: GeminiExplanationRequest,
  ): Promise<GeminiExplanationResult> {
    this.logger.log(
      `Generating explanation in "${request.idioma}" for: ${request.site?.nombre ?? 'unknown'}`,
    );

    const siteContext = request.site
      ? `Sitio: ${request.site.nombre} (${request.site.departamento}, Bolivia)\n` +
        `Tipo: ${request.site.tipo} / ${request.site.categoria}\n` +
        `Descripcion base: ${request.site.descripcionBaseEs}\n` +
        `Etiquetas: ${request.site.etiquetas.join(', ')}`
      : 'El sitio no fue identificado con certeza.';

    const labelsContext =
      request.visionLabels && request.visionLabels.length > 0
        ? `\nEtiquetas detectadas por Vision AI: ${request.visionLabels.join(', ')}`
        : '';

    const prompt =
      `Eres una guia turistica experta en Bolivia. Explica el siguiente sitio o patrimonio cultural ` +
      `de forma amena, precisa y culturalmente respetuosa. ` +
      `Responde UNICAMENTE en el idioma con codigo BCP-47: "${request.idioma}".\n\n` +
      `${siteContext}${labelsContext}\n\n` +
      `Genera una explicacion de 2-3 parrafos (150-250 palabras) adecuada para un turista.`;

    const parts: Array<{
      text?: string;
      inlineData?: { mimeType: string; data: string };
    }> = [{ text: prompt }];

    if (request.imageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: request.imageBase64,
        },
      });
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts }],
    });

    const explicacion = response.text ?? '';
    return { explicacion, idioma: request.idioma };
  }

  async chat(request: GeminiChatRequest): Promise<GeminiChatResult> {
    this.logger.log(
      `Chat question in "${request.idioma}": ${request.pregunta.substring(0, 60)}...`,
    );

    const sitesContext =
      request.sites && request.sites.length > 0
        ? `\nCatalogo de sitios disponibles:\n${request.sites
            .map(
              (s) => `- ${s.nombre} (${s.departamento}): ${s.descripcionCorta}`,
            )
            .join('\n')}`
        : '';

    const prompt =
      `Eres Munay, una guia turistica virtual especializada en el patrimonio cultural y natural de Bolivia. ` +
      `Responde de forma amena, precisa y culturalmente respetuosa. ` +
      `Responde UNICAMENTE en el idioma con codigo BCP-47: "${request.idioma}".\n\n` +
      `${sitesContext}\n\n` +
      `Pregunta del turista: ${request.pregunta}`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const respuesta = response.text ?? '';
    return { respuesta, idioma: request.idioma };
  }
}
