import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AskGuideDto } from './dto/ask-guide.dto';
import type { AskGuideResult } from './chat.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('ask')
  @HttpCode(200)
  @ApiOperation({ summary: 'Preguntarle al guia turistico IA' })
  @ApiResponse({
    status: 200,
    description: 'Respuesta del guia',
    schema: {
      example: {
        respuesta: 'Bolivia tiene muchos sitios increibles...',
        idioma: 'es',
        audioUrl: 'data:audio/mp3;base64,...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  async ask(@Body() dto: AskGuideDto): Promise<AskGuideResult> {
    return this.chatService.ask(dto);
  }
}
