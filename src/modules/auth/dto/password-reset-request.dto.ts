import { IsString } from 'class-validator';

export class PasswordResetRequestDto {
  @IsString()
  email: string;
}
