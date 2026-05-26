import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AppointmentsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // 1. Get appointments for a specific clinic (Clinic Dashboard)
  async findByClinic(clinicId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('clinic_id', clinicId)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // 2. Get appointments for a specific patient (Patient Dashboard)
  async findByPatient(patientId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('appointments')
      .select('*, clinics(name)') // Join with clinics to get the name
      .eq('patient_id', patientId)
      .order('date', { ascending: false });

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // 3. Create a new booking
  async create(bookingData: any) {
    const supabase = this.supabaseService.getClient();
    
    // Generate a random 8-character booking reference ID
    const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase();

    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        ...bookingData,
        booking_id: bookingRef,
        status: 'upcoming'
      }])
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // 4. Update status & handle Loyalty Points
  async updateStatus(id: string, status: string, patientId?: string) {
    const supabase = this.supabaseService.getClient();

    // A. Update the appointment status
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .update({ status })
      .eq('booking_id', id)
      .select()
      .single();

    if (appointmentError) throw new InternalServerErrorException(appointmentError.message);

    // B. Dual-Update: Give the patient a loyalty point if the appointment is completed
    if (status === 'completed' && patientId) {
      // Fetch current points
      const { data: profile } = await supabase
        .from('profiles')
        .select('loyalty_points')
        .eq('id', patientId)
        .single();
        
      const currentPoints = profile?.loyalty_points || 0;

      // Update points
      await supabase
        .from('profiles')
        .update({ loyalty_points: currentPoints + 1 })
        .eq('id', patientId);
    }

    return appointment;
  }
}