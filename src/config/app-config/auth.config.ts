import { registerAs } from '@nestjs/config';

const AuthConfig = registerAs('auth', () => ({
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  PEPPER: process.env.PASSWORD_PEPPER,
}));

export type IAuthConfig = Awaited<ReturnType<typeof AuthConfig>>;

export default AuthConfig;
