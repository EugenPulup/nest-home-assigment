import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordResetDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
