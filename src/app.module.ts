import { Module } from '@nestjs/common';
import { AppConfig } from '@/config';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from '@/modules/task/task.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { SharedModule } from '@/shared.module';
import { TokenModule } from '@/modules/token/token.module';
import { HealthModule } from '@/modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: AppConfig,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    HealthModule,
    SharedModule,
    TokenModule,
    AuthModule,
    TaskModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
