import { Injectable } from '@nestjs/common';
import { ConfigService as RootConfigService } from '@nestjs/config';

import { IAppConfig } from '@/config/app-config/app.config';
import { ITokenConfig } from '@/config/app-config/token.config';
import { IAuthConfig } from '@/config/app-config/auth.config';
import { IDatabaseConfig } from '@/config/app-config/database.config';

export type IConfig = {
  app: IAppConfig;
  token: ITokenConfig;
  auth: IAuthConfig;
  database: IDatabaseConfig;
};

@Injectable()
export class ConfigService {
  constructor(private readonly configService: RootConfigService) {}

  public getAppConfig(): IAppConfig {
    return this.configService.get<IAppConfig>('app');
  }

  public getAuthConfig(): IAuthConfig {
    return this.configService.get<IAuthConfig>('auth');
  }

  public getDatabaseConfig(): IDatabaseConfig {
    return this.configService.get<IDatabaseConfig>('database');
  }

  public getTokenConfig(): ITokenConfig {
    return this.configService.get<ITokenConfig>('token');
  }

  public getConfig(): IConfig {
    return {
      app: this.getAppConfig(),
      token: this.getTokenConfig(),
      auth: this.getAuthConfig(),
      database: this.getDatabaseConfig(),
    };
  }
}
