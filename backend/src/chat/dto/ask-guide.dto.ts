import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AskGuideDto {
  @ApiProperty({
    description: 'Pregunta del turista al guia',
    example: 'Que puedo visitar en La Paz?',
  })
  @IsString()
  @IsNotEmpty()
  pregunta!: string;

  @ApiProperty({
    description: 'Codigo BCP-47 del idioma de respuesta',
    example: 'es',
    minLength: 2,
    maxLength: 10,
  })
  @IsString()
  @Length(2, 10)
  idioma!: string;

  @ApiPropertyOptional({
    description: 'ID del sitio para dar contexto especifico',
    example: 'tiwanaku',
  })
  @IsOptional()
  @IsString()
  siteId?: string;
}
