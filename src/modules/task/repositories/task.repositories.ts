import { BaseRepository } from '@/modules/database/repositories/base.repository';
import { DatabaseService } from '@/modules/database/database.service';
import { TaskEntity } from '@/modules/task/entities/task.entity';
import { DatabaseTables } from '@/modules/database/database.enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends BaseRepository<TaskEntity> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, DatabaseTables.TASKS);
  }

  async search(userId: number, query: string): Promise<TaskEntity[]> {
    const sql = `
      SELECT * FROM ${DatabaseTables.TASKS} 
      WHERE "userId" = $1 
      AND (name ILIKE $2 OR content ILIKE $2)
      ORDER BY "createdAt" DESC
    `;
    const result = await this.databaseService.query<TaskEntity>(sql, [
      userId,
      `%${query}%`,
    ]);
    return result.rows;
  }
}
