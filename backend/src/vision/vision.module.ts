import { Module } from '@nestjs/common';
import { VisionService } from './vision.service';
import { VisionServiceMock } from './vision.service.mock';

const isMock = process.env.GOOGLE_CLOUD_MOCK_MODE === 'true';

@Module({
  providers: [
    {
      provide: 'VisionServicePort',
      useClass: isMock ? VisionServiceMock : VisionService,
    },
  ],
  exports: ['VisionServicePort'],
})
export class VisionModule {}
