import { Module } from '@nestjs/common';
import { RecognizeController } from './recognize.controller';
import { RecognizeService } from './recognize.service';
import { CatalogModule } from '../catalog/catalog.module';
import { VisionModule } from '../vision/vision.module';
import { GeminiModule } from '../gemini/gemini.module';
import { TtsModule } from '../tts/tts.module';

@Module({
  imports: [CatalogModule, VisionModule, GeminiModule, TtsModule],
  controllers: [RecognizeController],
  providers: [RecognizeService],
})
export class RecognizeModule {}
