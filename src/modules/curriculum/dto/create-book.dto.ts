import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  class: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  subject: string;
}
