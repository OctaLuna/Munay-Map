import {
  IsArray,
  IsString,
  IsNotEmpty,
  ValidateNested,
  Length,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QuizAnswerDto {
  @ApiProperty({ example: 'q1' })
  @IsString()
  @IsNotEmpty()
  questionId!: string;

  @ApiProperty({ example: 'q1-a' })
  @IsString()
  @IsNotEmpty()
  selectedOptionId!: string;

  @ApiProperty({ type: [String], example: ['altiplano', 'naturaleza'] })
  @IsArray()
  @IsString({ each: true })
  etiquetas!: string[];
}

export class QuizRecommendationRequestDto {
  @ApiProperty({ type: [QuizAnswerDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDto)
  respuestas!: QuizAnswerDto[];

  @ApiProperty({ example: 'es', minLength: 2, maxLength: 10 })
  @IsString()
  @Length(2, 10)
  idioma!: string;
}
