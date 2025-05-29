import { BadRequestException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { ConfigService } from '@/config';
import { ResetTokenPayload } from '../types';

@Injectable()
export class ResetTokenService {
  constructor(private readonly configService: ConfigService) {}

  public validate(token: string): ResetTokenPayload {
    const { resetTokenSecretKey } = this.configService.getTokenConfig();

    try {
      return verify(token, resetTokenSecretKey) as ResetTokenPayload;
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }

  public decode(token: string): Record<string, any> {
    if (!token?.trim?.() || !token.includes('.'))
      throw new BadRequestException('Invalid token format');

    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    ) as Record<string, unknown>;
  }

  public create(email: string): string {
    const { resetTokenExpiresIn, resetTokenSecretKey } =
      this.configService.getTokenConfig();

    return sign({ email }, resetTokenSecretKey, {
      expiresIn: resetTokenExpiresIn,
    });
  }
}
