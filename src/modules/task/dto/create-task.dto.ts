import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly content: string;
}
