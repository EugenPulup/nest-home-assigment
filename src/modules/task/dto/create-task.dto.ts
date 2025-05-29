import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly content: string;
}
