import { BaseRepository } from '@/modules/database/repositories/base.repository';
import { DatabaseService } from '@/modules/database/database.service';
import { User } from '@/modules/user/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'user');
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.databaseService
      .query<User>(`SELECT * FROM user WHERE email = $1`, [email])
      .then((result) => result.rows[0] ?? null);
  }
}
