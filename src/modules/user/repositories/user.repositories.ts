import { BaseRepository } from '@/modules/database/repositories/base.repository';
import { DatabaseService } from '@/modules/database/database.service';
import { DatabaseTables } from '@/modules/database/database.enums';
import { User } from '@/modules/user/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, DatabaseTables.USERS);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.databaseService
      .query<User>(`SELECT * FROM ${DatabaseTables.USERS} WHERE email = $1`, [
        email,
      ])
      .then((result) => result.rows[0] ?? null);
  }
}
