import { BadRequestException, Injectable } from '@nestjs/common';

import { TokenService } from '@/modules/token/token.service';
import { User } from '@/modules/user/types';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  public generateAccessToken(user: User) {
    return this.tokenService.createAccessToken({
      email: user.email,
      username: user.username,
    });
  }

  public getAuthResponse(user: User) {
    const accessToken = this.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  public extractTokenFromBearerHeader(bearerToken: string) {
    const parts = bearerToken.split(' ');
    const bearer = parts[0];
    const token = parts[1];

    if (bearer !== 'Bearer') {
      throw new BadRequestException('Wrong token format');
    }

    return token;
  }
}
