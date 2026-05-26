import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Global() // This makes the service available everywhere without needing to import the module repeatedly
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}