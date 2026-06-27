import { Injectable, Inject, Logger } from '@nestjs/common';
import { CatalogService } from '../catalog/catalog.service';
import type { VisionServicePort } from '../vision/vision.service.interface';
import type { GeminiServicePort } from '../gemini/gemini.service.interface';
import type { TtsServicePort } from '../tts/tts.service.interface';
import type { RecognizeRequestDto } from './dto/recognize-request.dto';
import type { Site } from '../catalog/site.interface';

export interface RecognizeResult {
  site: Site | null;
  explicacion: string;
  idioma: string;
  audioUrl: string | null;
  confianza: number;
}

@Injectable()
export class RecognizeService {
  private readonly logger = new Logger(RecognizeService.name);

  constructor(
    private readonly catalogService: CatalogService,
    @Inject('VisionServicePort')
    private readonly visionService: VisionServicePort,
    @Inject('GeminiServicePort')
    private readonly geminiService: GeminiServicePort,
    @Inject('TtsServicePort') private readonly ttsService: TtsServicePort,
  ) {}

  async recognize(dto: RecognizeRequestDto): Promise<RecognizeResult> {
    this.logger.log(`Processing recognition request (idioma: ${dto.idioma})`);

    // Step 1: Vision AI
    const visionResult = await this.visionService.analyzeImage(dto.imageBase64);
    this.logger.log(
      `Vision labels: ${visionResult.labels.join(', ')} | landmark: ${visionResult.landmark?.name ?? 'none'}`,
    );

    // Step 2: Match site from catalog
    let site: Site | null = null;
    let confianza = 0;

    if (visionResult.landmark) {
      const found = this.catalogService.findByLandmark(
        visionResult.landmark.name,
      );
      if (found) {
        site = found;
        confianza = 0.9;
      }
    }

    if (!site && visionResult.labels.length > 0) {
      const candidates = this.catalogService.findByEtiquetas(
        visionResult.labels.map((l) => l.toLowerCase().replace(/ /g, '_')),
      );
      if (candidates.length > 0) {
        site = candidates[0] ?? null;
        confianza = 0.65;
      }
    }

    // Step 3: Gemini explanation
    const geminiResult = await this.geminiService.generateExplanation({
      site,
      visionLabels: visionResult.labels,
      idioma: dto.idioma,
      imageBase64: dto.imageBase64,
    });

    // Step 4: TTS
    let audioUrl: string | null = null;
    try {
      const ttsResult = await this.ttsService.synthesize({
        text: geminiResult.explicacion,
        languageCode: dto.idioma,
      });
      audioUrl = `data:audio/mp3;base64,${ttsResult.audioBase64}`;
    } catch (err) {
      this.logger.warn('TTS failed, returning null audioUrl', err);
    }

    return {
      site,
      explicacion: geminiResult.explicacion,
      idioma: dto.idioma,
      audioUrl,
      confianza,
    };
  }
}
