import { BaseRepository } from '@/modules/database/repositories/base.repository';
import { DatabaseService } from '@/modules/database/database.service';
import { ResetTokenEntity } from '@/modules/token/entities/reset-token.entity';
import { DatabaseTables } from '@/modules/database/database.enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetTokenRepository extends BaseRepository<ResetTokenEntity> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, DatabaseTables.RESET_TOKENS);
  }
}
