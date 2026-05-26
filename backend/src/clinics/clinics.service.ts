import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ClinicsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('clinics')
      .select('*')
      .eq('verified', true);

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('clinics')
      .select('*, services(*), reviews(*)')
      .eq('id', id)
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }
}