import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '@/modules/user/types';

export class CreateUserDto implements Omit<User, 'id'> {
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
