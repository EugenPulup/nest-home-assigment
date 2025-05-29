import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '@/modules/auth/auth.service';
import { TokenService } from '@/modules/token/token.service';
import { TokenPayload } from '@/modules/token/types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    public readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const { authorization }: any = request.headers;

    if (!authorization || typeof authorization !== 'string')
      throw new UnauthorizedException();

    try {
      const token =
        this.authService.extractTokenFromBearerHeader(authorization);

      const payload = this.tokenService.validate(token) as TokenPayload;

      request['userId'] = payload.id;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
