import { registerAs } from '@nestjs/config';

const AppConfig = registerAs('app', () => ({
  appName: process.env.APP_NAME,
  nodeEnv: process.env.NODE_ENV || 'local',
  port: process.env.PORT || 3000,
}));

export type IAppConfig = Awaited<ReturnType<typeof AppConfig>>;

export default AppConfig;
