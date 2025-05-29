import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUser } from '@/modules/user/types';

export class CreateUserDto implements CreateUser {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;
}
