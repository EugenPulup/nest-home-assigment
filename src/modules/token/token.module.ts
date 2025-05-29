import { Global, Module } from '@nestjs/common';

import { TokenService } from '@/modules/token/services/token.service';
import { ResetTokenService } from '@/modules/token/services/reset-token.service';
import { ResetTokenRepository } from '@/modules/token/repositories/reset-token.repositories';

@Global()
@Module({
  providers: [TokenService, ResetTokenService, ResetTokenRepository],
  exports: [TokenService, ResetTokenService, ResetTokenRepository],
})
export class TokenModule {}
