import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TokenService } from '@/modules/token/token.service';
import { AuthService } from '@/modules/auth/auth.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TokenService, AuthService],
})
export class TaskModule {}
