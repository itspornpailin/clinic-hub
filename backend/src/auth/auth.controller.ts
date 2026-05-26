import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userData: any) {
    return this.authService.signUp(userData);
  }

  @Post('signin')
  signIn(@Body() credentials: any) {
    return this.authService.signIn(credentials);
  }

  @Post('signout')
  signOut(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.signOut(token);
  }
}