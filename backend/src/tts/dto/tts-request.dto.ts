import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TtsRequestDto {
  @ApiProperty({
    description: 'Texto a convertir en audio',
    example: 'La Puerta del Sol es el monumento más emblemático de Tiwanaku.',
  })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({
    description: 'Código BCP-47 del idioma',
    example: 'es',
    minLength: 2,
    maxLength: 10,
  })
  @IsString()
  @Length(2, 10)
  languageCode!: string;
}
