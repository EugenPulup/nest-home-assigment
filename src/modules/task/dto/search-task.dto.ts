import { IsOptional, IsString } from 'class-validator';

export class SearchTaskDto {
  @IsString()
  @IsOptional()
  readonly query?: string;
}
