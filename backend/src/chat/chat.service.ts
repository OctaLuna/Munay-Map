import { Injectable, Inject, Logger } from '@nestjs/common';
import { CatalogService } from '../catalog/catalog.service';
import type { GeminiServicePort } from '../gemini/gemini.service.interface';
import type { TtsServicePort } from '../tts/tts.service.interface';
import type { AskGuideDto } from './dto/ask-guide.dto';

export interface AskGuideResult {
  respuesta: string;
  idioma: string;
  audioUrl: string | null;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly catalogService: CatalogService,
    @Inject('GeminiServicePort')
    private readonly geminiService: GeminiServicePort,
    @Inject('TtsServicePort') private readonly ttsService: TtsServicePort,
  ) {}

  async ask(dto: AskGuideDto): Promise<AskGuideResult> {
    this.logger.log(
      `Chat ask: "${dto.pregunta.substring(0, 60)}" (${dto.idioma})`,
    );

    const allSites = this.catalogService.getAll();

    const geminiResult = await this.geminiService.chat({
      pregunta: dto.pregunta,
      idioma: dto.idioma,
      siteId: dto.siteId,
      sites: allSites,
    });

    let audioUrl: string | null = null;
    try {
      const ttsResult = await this.ttsService.synthesize({
        text: geminiResult.respuesta,
        languageCode: dto.idioma,
      });
      audioUrl = `data:audio/mp3;base64,${ttsResult.audioBase64}`;
    } catch (err) {
      this.logger.warn('TTS failed for chat, returning null audioUrl', err);
    }

    return {
      respuesta: geminiResult.respuesta,
      idioma: dto.idioma,
      audioUrl,
    };
  }
}
