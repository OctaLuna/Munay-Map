import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecognizeService } from './recognize.service';
import { RecognizeRequestDto } from './dto/recognize-request.dto';
import type { RecognizeResult } from './recognize.service';

@ApiTags('recognize')
@Controller('recognize')
export class RecognizeController {
  constructor(private readonly recognizeService: RecognizeService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Reconocer imagen con Vision AI + Gemini + TTS' })
  @ApiResponse({
    status: 200,
    description: 'Resultado del reconocimiento',
    schema: {
      example: {
        site: { id: 'tiwanaku', nombre: 'Tiwanaku' },
        explicacion: 'Tiwanaku es un sitio arqueologico...',
        idioma: 'es',
        audioUrl: 'data:audio/mp3;base64,...',
        confianza: 0.9,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  async recognize(@Body() dto: RecognizeRequestDto): Promise<RecognizeResult> {
    return this.recognizeService.recognize(dto);
  }
}
