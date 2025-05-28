import { registerAs } from '@nestjs/config';

const TokenConfig = registerAs('token', () => ({
  tokenSecretKey: process.env.TOKEN_SECRET,
  tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN),
}));

export type ITokenConfig = {
  tokenSecretKey: string;
  tokenExpiresIn: number;
};

export default TokenConfig;
