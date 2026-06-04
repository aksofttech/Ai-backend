import { IsUUID } from 'class-validator';

export class IngestPdfDto {
  @IsUUID()
  chapterId: string;
}
