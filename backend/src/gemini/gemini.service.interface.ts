import type { Site } from '../catalog/site.interface';

export interface GeminiExplanationRequest {
  site: Site | null;
  /** Labels/tags from Vision AI to help Gemini understand context */
  visionLabels?: string[];
  /** Target language BCP-47 code */
  idioma: string;
  /** Optional image base64 for multimodal prompts */
  imageBase64?: string;
}

export interface GeminiExplanationResult {
  explicacion: string;
  idioma: string;
}

export interface GeminiChatRequest {
  pregunta: string;
  idioma: string;
  /** Optional site context */
  siteId?: string;
  /** All sites for general knowledge context */
  sites?: Site[];
}

export interface GeminiChatResult {
  respuesta: string;
  idioma: string;
}

export interface GeminiServicePort {
  generateExplanation(
    request: GeminiExplanationRequest,
  ): Promise<GeminiExplanationResult>;
  chat(request: GeminiChatRequest): Promise<GeminiChatResult>;
}
