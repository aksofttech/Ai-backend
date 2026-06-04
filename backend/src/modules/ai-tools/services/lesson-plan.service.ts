import { Injectable } from '@nestjs/common';
import { OpenaiChatService } from './openai-chat.service';
import { GenerateContentDto } from '../dto/generate-content.dto';

@Injectable()
export class LessonPlanService {
  constructor(private readonly chat: OpenaiChatService) {}

  async generate(dto: GenerateContentDto, context: string): Promise<string> {
    const system = `You are an expert instructional designer for Yugsoft Tech.
Produce a complete lesson plan with objectives, materials, warm-up, instruction, activities, assessment, and homework.
Use Markdown headings.`;
    const user = `Prompt: ${dto.prompt}
Grade: ${dto.grade ?? 'N/A'}
Subject: ${dto.subject ?? 'N/A'}
Curriculum context:
${context || 'No RAG context available.'}`;
    return this.chat.complete(system, user);
  }
}
