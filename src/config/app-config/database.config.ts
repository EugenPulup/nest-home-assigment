import { registerAs } from '@nestjs/config';

const DatabaseConfig = registerAs('database', () => ({
  DATABASE_URL: process.env.DATABASE_URL,
}));

export type IDatabaseConfig = Awaited<ReturnType<typeof DatabaseConfig>>;

export default DatabaseConfig;
