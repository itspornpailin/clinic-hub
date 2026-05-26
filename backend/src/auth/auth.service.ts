import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(userData: any) {
    const supabase = this.supabaseService.getClient();
    const { email, password, firstName, lastName, phone, role } = userData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          role: role === 'admin' ? 'patient' : role, // Security check matches frontend
          full_name: `${firstName} ${lastName}`.trim(),
        },
      },
    });

    if (error) throw new BadRequestException(error.message);
    return { message: 'User created successfully', user: data.user };
  }

  async signIn(credentials: any) {
    const supabase = this.supabaseService.getClient();
    const { email, password } = credentials;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new UnauthorizedException(error.message);
    
    return { 
      message: 'Login successful', 
      session: data.session,
      user: data.user 
    };
  }

  async signOut(token: string) {
    const supabase = this.supabaseService.getClient();
    const { error } = await supabase.auth.admin.signOut(token);
    
    if (error) throw new BadRequestException(error.message);
    return { message: 'Signed out successfully' };
  }
}