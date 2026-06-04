import { Injectable } from '@nestjs/common';
import { OpenaiChatService } from './openai-chat.service';
import { GenerateContentDto } from '../dto/generate-content.dto';

@Injectable()
export class PptService {
  constructor(private readonly chat: OpenaiChatService) {}

  async generate(dto: GenerateContentDto, context: string): Promise<string> {
    const system = `You are a presentation designer for Yugsoft Tech.
Return slide-by-slide content as JSON array: [{ "title": string, "bullets": string[] }].
Keep 8-12 slides, classroom-appropriate language.`;
    const user = `Prompt: ${dto.prompt}
Grade: ${dto.grade ?? 'N/A'}
Subject: ${dto.subject ?? 'N/A'}
Curriculum context:
${context || 'No RAG context available.'}`;
    return this.chat.complete(system, user);
  }
}
