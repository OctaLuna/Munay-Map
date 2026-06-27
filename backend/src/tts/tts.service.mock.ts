import { Injectable } from '@nestjs/common';
import type {
  TtsServicePort,
  TtsSynthesizeRequest,
  TtsSynthesizeResult,
} from './tts.service.interface';

// Short silent MP3 (base64) used as placeholder in mock mode
const SILENT_MP3_BASE64 =
  '//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA' +
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

@Injectable()
export class TtsServiceMock implements TtsServicePort {
  // eslint-disable-next-line @typescript-eslint/require-await
  async synthesize(
    _request: TtsSynthesizeRequest,
  ): Promise<TtsSynthesizeResult> {
    return { audioBase64: SILENT_MP3_BASE64 };
  }
}
