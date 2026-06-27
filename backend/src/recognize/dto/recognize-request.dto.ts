import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecognizeRequestDto {
  @ApiProperty({
    description: 'Imagen en base64 (JPEG/PNG)',
    example: '/9j/4AAQSkZJRgABAQEASABIAAD...',
  })
  @IsString()
  @IsNotEmpty()
  imageBase64!: string;

  @ApiProperty({
    description: 'Codigo BCP-47 del idioma de respuesta',
    example: 'es',
    minLength: 2,
    maxLength: 10,
  })
  @IsString()
  @Length(2, 10)
  idioma!: string;
}
