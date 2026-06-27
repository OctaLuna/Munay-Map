import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { TtsServiceMock } from './tts.service.mock';

const isMock = process.env.GOOGLE_CLOUD_MOCK_MODE === 'true';

@Module({
  providers: [
    {
      provide: 'TtsServicePort',
      useClass: isMock ? TtsServiceMock : TtsService,
    },
  ],
  exports: ['TtsServicePort'],
})
export class TtsModule {}
