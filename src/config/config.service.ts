import { Injectable } from '@nestjs/common';
import { ConfigService as RootConfigService } from '@nestjs/config';

import { IAppConfig } from '@/config/app-config/app.config';
import { ITokenConfig } from '@/config/app-config/token.config';

export type IConfig = {
  app: IAppConfig;
  token: ITokenConfig;
};

@Injectable()
export class ConfigService {
  constructor(private readonly configService: RootConfigService) {}

  public getAppConfig(): IAppConfig {
    return this.configService.get<IAppConfig>('app');
  }

  public getTokenConfig(): ITokenConfig {
    return this.configService.get<ITokenConfig>('token');
  }

  public getConfig(): IConfig {
    return {
      app: this.getAppConfig(),
      token: this.getTokenConfig(),
    };
  }
}
