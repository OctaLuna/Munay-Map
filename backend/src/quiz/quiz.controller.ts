import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import type { QuizRecommendation } from './quiz.service';
import { QuizRecommendationRequestDto } from './dto/quiz-recommendation-request.dto';
import type { QuizQuestion } from './quiz.interface';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('questions')
  @ApiOperation({ summary: 'Obtener las preguntas del quiz de perfil' })
  @ApiResponse({ status: 200, description: 'Lista de preguntas con opciones' })
  getQuestions(): QuizQuestion[] {
    return this.quizService.getQuestions();
  }

  @Post('recommendation')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obtener recomendacion de viaje basada en respuestas del quiz',
  })
  @ApiResponse({
    status: 200,
    description:
      'Recomendacion personalizada con lugares, gastronomia, experiencias y tips',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  getRecommendation(
    @Body() dto: QuizRecommendationRequestDto,
  ): QuizRecommendation {
    return this.quizService.getRecommendation(dto);
  }

  /**
   * POST /quiz/resultado
   * Alias de /quiz/recommendation — nombre semántico requerido por el documento técnico.
   * Acepta el mismo payload y devuelve la misma respuesta.
   */
  @Post('resultado')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Guia personalizada: resultado completo del quiz con tips',
  })
  @ApiResponse({
    status: 200,
    description:
      'Guia personalizada con lugares, gastronomia, experiencias y consejos practicos',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  getResultado(
    @Body() dto: QuizRecommendationRequestDto,
  ): QuizRecommendation {
    return this.quizService.getRecommendation(dto);
  }
}
