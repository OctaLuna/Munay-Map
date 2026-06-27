import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { GetSitesQueryDto } from './dto/get-sites-query.dto';
import type { Site } from './site.interface';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('sites')
  @ApiOperation({ summary: 'Listar todos los sitios con filtros opcionales' })
  @ApiResponse({ status: 200, description: 'Lista de sitios' })
  getSites(@Query() query: GetSitesQueryDto): Site[] {
    return this.catalogService.findAll(query);
  }

  @Get('sites/:id')
  @ApiOperation({ summary: 'Obtener un sitio por ID' })
  @ApiParam({ name: 'id', description: 'ID del sitio (ej: tiwanaku)' })
  @ApiResponse({ status: 200, description: 'Sitio encontrado' })
  @ApiResponse({ status: 404, description: 'Sitio no encontrado' })
  getSiteById(@Param('id') id: string): Site {
    return this.catalogService.findById(id);
  }
}
