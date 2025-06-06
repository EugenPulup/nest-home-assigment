import { Exclude } from 'class-transformer';

export class TaskEntity {
  id: number;
  name: string;
  content: string;
  createdAt: Date;

  @Exclude()
  userId: number;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
