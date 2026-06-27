import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CatalogModule } from '../catalog/catalog.module';
import { GeminiModule } from '../gemini/gemini.module';
import { TtsModule } from '../tts/tts.module';

@Module({
  imports: [CatalogModule, GeminiModule, TtsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
