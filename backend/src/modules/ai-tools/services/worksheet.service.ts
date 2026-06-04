import { Injectable } from '@nestjs/common';
import { OpenaiChatService } from './openai-chat.service';
import { GenerateContentDto } from '../dto/generate-content.dto';

@Injectable()
export class WorksheetService {
  constructor(private readonly chat: OpenaiChatService) {}

  async generate(dto: GenerateContentDto, context: string): Promise<string> {
    const system = `You are an expert K-12 worksheet designer for Yugsoft Tech.
Create structured worksheets with clear sections, numbered questions, and answer key hints.
Output in Markdown.`;
    const user = `Prompt: ${dto.prompt}
Grade: ${dto.grade ?? 'N/A'}
Subject: ${dto.subject ?? 'N/A'}
Curriculum context:
${context || 'No RAG context available.'}`;
    return this.chat.complete(system, user);
  }
}
