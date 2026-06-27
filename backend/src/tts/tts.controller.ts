import { Controller, Post, Body, HttpCode, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { TtsServicePort } from './tts.service.interface';
import { TtsRequestDto } from './dto/tts-request.dto';

@ApiTags('tts')
@Controller('tts')
export class TtsController {
  constructor(
    @Inject('TtsServicePort')
    private readonly ttsService: TtsServicePort,
  ) {}

  @Post('synthesize')
  @HttpCode(200)
  @ApiOperation({ summary: 'Convertir texto a audio MP3 (Google TTS)' })
  @ApiResponse({
    status: 200,
    description: 'Audio en base64',
    schema: {
      example: {
        audioBase64: 'SUQzBAAAAAAAI1RTU0UAAAAP...',
        languageCode: 'es-ES',
      },
    },
  })
  async synthesize(@Body() dto: TtsRequestDto) {
    const result = await this.ttsService.synthesize({
      text: dto.text,
      languageCode: dto.languageCode,
    });
    return {
      audioBase64: result.audioBase64,
      languageCode: dto.languageCode,
    };
  }
}
