import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class RagChatDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsUUID()
  chapterId?: string;

  @IsOptional()
  @IsUUID()
  bookId?: string;

  @IsOptional()
  @IsArray()
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}
