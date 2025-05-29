import { Module } from '@nestjs/common';
import { TaskService } from '@/modules/task/task.service';
import { TaskController } from '@/modules/task/task.controller';
import { AuthModule } from '@/modules/auth/auth.module';
import { TaskRepository } from '@/modules/task/repositories/task.repositories';

@Module({
  imports: [AuthModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
