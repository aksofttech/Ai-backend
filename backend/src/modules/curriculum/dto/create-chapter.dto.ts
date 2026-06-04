import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title: string;
}
