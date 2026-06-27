import { Injectable, Logger } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import type {
  TtsServicePort,
  TtsSynthesizeRequest,
  TtsSynthesizeResult,
} from './tts.service.interface';

@Injectable()
export class TtsService implements TtsServicePort {
  private readonly logger = new Logger(TtsService.name);
  private client = new TextToSpeechClient();

  async synthesize(
    request: TtsSynthesizeRequest,
  ): Promise<TtsSynthesizeResult> {
    this.logger.log(`Synthesizing TTS in language "${request.languageCode}"`);

    // Normalize BCP-47: 'es' -> 'es-ES', 'en' -> 'en-US', etc.
    const languageCode = this.normalizeLanguageCode(request.languageCode);

    const [response] = await this.client.synthesizeSpeech({
      input: { text: request.text },
      voice: { languageCode, ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    const audioContent = response.audioContent;
    if (!audioContent) {
      throw new Error('TTS returned empty audio content');
    }

    const audioBase64 = Buffer.from(audioContent).toString('base64');
    return { audioBase64 };
  }

  private normalizeLanguageCode(code: string): string {
    // If already has region tag (e.g. 'pt-BR', 'zh-TW'), return as-is
    if (code.includes('-')) return code;
    // Map common short codes to full BCP-47
    const map: Record<string, string> = {
      es: 'es-ES',
      en: 'en-US',
      pt: 'pt-BR',
      fr: 'fr-FR',
      de: 'de-DE',
      it: 'it-IT',
      ja: 'ja-JP',
      ko: 'ko-KR',
      zh: 'zh-CN',
      ar: 'ar-XA',
      ru: 'ru-RU',
      hi: 'hi-IN',
      nl: 'nl-NL',
      pl: 'pl-PL',
      tr: 'tr-TR',
    };
    return map[code] ?? `${code}-${code.toUpperCase()}`;
  }
}
