import { Injectable } from '@nestjs/common';
import { OpenaiChatService } from './openai-chat.service';
import { GenerateContentDto } from '../dto/generate-content.dto';

@Injectable()
export class HomeworkService {
  constructor(private readonly chat: OpenaiChatService) {}

  async generate(dto: GenerateContentDto, context: string): Promise<string> {
    const system = `You are an expert homework assignment writer for Yugsoft Tech.
Create differentiated homework with instructions, tasks, and optional extension activity.
Output in Markdown.`;
    const user = `Prompt: ${dto.prompt}
Grade: ${dto.grade ?? 'N/A'}
Subject: ${dto.subject ?? 'N/A'}
Curriculum context:
${context || 'No RAG context available.'}`;
    return this.chat.complete(system, user);
  }
}
