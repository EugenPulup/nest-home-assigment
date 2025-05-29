import { BaseRepository } from '@/modules/database/repositories/base.repository';
import { DatabaseService } from '@/modules/database/database.service';
import { DatabaseTables } from '@/modules/database/database.enums';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, DatabaseTables.USERS);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.databaseService
      .query<UserEntity>(
        `SELECT * FROM ${DatabaseTables.USERS} WHERE email = $1`,
        [email],
      )
      .then((result) => result.rows[0] ?? null);
  }
}
