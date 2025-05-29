import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { ConfigService } from '@/config';
import { TokenPayload } from './types';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  public validate(token: string): Record<string, any> {
    const { tokenSecretKey } = this.configService.getTokenConfig();

    try {
      return verify(token, tokenSecretKey) as Record<string, any>;
    } catch {
      throw new Error('Invalid token');
    }
  }

  public decode(token: string): Record<string, any> {
    if (!token?.trim?.() || !token.includes('.'))
      throw new Error('Invalid token format');

    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    ) as Record<string, unknown>;
  }

  public createAccessToken(data: TokenPayload): string {
    const { tokenSecretKey, tokenExpiresIn } =
      this.configService.getTokenConfig();

    return sign(data as object, tokenSecretKey, {
      expiresIn: tokenExpiresIn,
    });
  }
}
