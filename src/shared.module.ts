import { Global, Module } from '@nestjs/common';

import { ConfigService } from '@/config';
import { DatabaseService } from '@/modules/database/database.service';

@Global()
@Module({
  imports: [],
  providers: [ConfigService, DatabaseService],
  exports: [ConfigService, DatabaseService],
})
export class SharedModule {}
