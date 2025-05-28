import { Module } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { UserRepository } from '@/modules/user/repositories/user.repositories';

@Module({
  imports: [],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
