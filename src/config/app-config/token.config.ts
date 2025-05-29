import { registerAs } from '@nestjs/config';

const TokenConfig = registerAs('token', () => ({
  tokenSecretKey: process.env.TOKEN_SECRET,
  tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN),
}));

export type ITokenConfig = Awaited<ReturnType<typeof TokenConfig>>;

export default TokenConfig;
