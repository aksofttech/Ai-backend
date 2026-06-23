import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  class?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  subject?: string;
}
