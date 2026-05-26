import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';

@UseGuards(SupabaseAuthGuard) // <--- THIS LOCKS DOWN EVERY ROUTE IN THIS FILE
@Controller('api/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('clinic/:clinicId')
  findByClinic(@Param('clinicId') clinicId: string) {
    return this.appointmentsService.findByClinic(clinicId);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.appointmentsService.findByPatient(patientId);
  }

  @Post()
  create(@Body() bookingData: any, @Request() req: any) {
    // Because of the guard, req.user now securely contains the logged-in user!
    return this.appointmentsService.create(bookingData);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('patient_id') patientId?: string,
  ) {
    return this.appointmentsService.updateStatus(id, status, patientId);
  }
}