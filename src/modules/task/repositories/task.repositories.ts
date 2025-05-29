import { BaseRepository } from '@/modules/database/repositories/base.repository';
import { DatabaseService } from '@/modules/database/database.service';
import { Task } from '@/modules/task/types';
import { DatabaseTables } from '@/modules/database/database.enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, DatabaseTables.TASKS);
  }
}
