import { CreateTask } from '@/modules/task/types';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto implements CreateTask {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly content: string;
}
