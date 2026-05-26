import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This gets populated by the SupabaseAuthGuard

    const role = user?.user_metadata?.role;
    
    if (role !== 'admin') {
      throw new ForbiddenException('Requires platform admin privileges');
    }

    return true;
  }
}