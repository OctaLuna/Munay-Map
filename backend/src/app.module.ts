import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { CatalogModule } from './catalog/catalog.module';
import { VisionModule } from './vision/vision.module';
import { GeminiModule } from './gemini/gemini.module';
import { TtsModule } from './tts/tts.module';
import { RecognizeModule } from './recognize/recognize.module';
import { ChatModule } from './chat/chat.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 60,
        },
      ],
    }),
    HealthModule,
    CatalogModule,
    VisionModule,
    GeminiModule,
    TtsModule,
    RecognizeModule,
    ChatModule,
    QuizModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
