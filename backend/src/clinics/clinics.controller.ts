import { Controller, Get, Param } from '@nestjs/common';
import { ClinicsService } from './clinics.service';

@Controller('api/clinics') // We add 'api/' to keep the routes clean
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicsService.findOne(id);
  }
}