import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check del servidor' })
  @ApiResponse({
    status: 200,
    description: 'Servidor funcionando',
    schema: {
      example: { status: 'ok', mockMode: true },
    },
  })
  getHealth(): { status: string; mockMode: boolean } {
    return {
      status: 'ok',
      mockMode: process.env.GOOGLE_CLOUD_MOCK_MODE === 'true',
    };
  }
}
