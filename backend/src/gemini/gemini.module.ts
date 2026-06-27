import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiServiceMock } from './gemini.service.mock';

const isMock = process.env.GOOGLE_CLOUD_MOCK_MODE === 'true';

@Module({
  providers: [
    {
      provide: 'GeminiServicePort',
      useClass: isMock ? GeminiServiceMock : GeminiService,
    },
  ],
  exports: ['GeminiServicePort'],
})
export class GeminiModule {}
