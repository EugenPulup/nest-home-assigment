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

  async search(userId: number, query: string): Promise<Task[]> {
    const sql = `
      SELECT * FROM ${DatabaseTables.TASKS} 
      WHERE "userId" = $1 
      AND (name ILIKE $2 OR content ILIKE $2)
      ORDER BY "createdAt" DESC
    `;
    const result = await this.databaseService.query<Task>(sql, [
      userId,
      `%${query}%`,
    ]);
    return result.rows;
  }
}
