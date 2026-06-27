import { Injectable } from '@nestjs/common';
import { OpenaiChatService } from './openai-chat.service';
import { GenerateContentDto } from '../dto/generate-content.dto';

@Injectable()
export class AnswerKeyService {
  constructor(private readonly chat: OpenaiChatService) {}

  async generate(dto: GenerateContentDto, context: string): Promise<string> {
    const config = dto.answerKeyConfig || {};
    const generalDetails = config.generalDetails || {};
    const mode = config.mode || 'custom';

    const system = `You are an expert Educational Assessment AI and Examiner.
Your task is to generate a comprehensive, authoritative Answer Key and Marking Scheme for teachers based on the provided curriculum content and user instructions.

### INSTRUCTIONS:
1. **Input Analysis**:
   - If user provided custom questions or examination paper text in the prompt, accurately extract/identify each question number and statement.
   - If requested in 'auto' review mode, generate 6-10 standard high-quality examination questions covering the core concepts of the attached chapter(s).

2. **Detailed Model Answers**:
   - Provide clear, accurate, structured model answers based strictly on the textbook content where applicable.

3. **Step-by-Step Marks Allocation**:
   - Allocate realistic marks (e.g., 1, 2, 3, or 5) depending on question complexity.

4. **Teacher Grading Tips**:
   - Provide practical grading guidance (e.g., "Award 1 mark for definition, 1 mark for diagram/example").

5. **Output JSON Format**:
   - Return ONLY a raw JSON object matching the schema below. DO NOT wrap the output in markdown blocks like \`\`\`json. Do not include any conversational filler.

{
  "assessmentDetails": {
    "title": "${generalDetails.title || dto.chapterTitle || dto.subject || 'Assessment Answer Key'}",
    "className": "${generalDetails.className || dto.grade || 'Class'}",
    "subject": "${generalDetails.subject || dto.subject || 'Subject'}",
    "totalMarks": "${generalDetails.totalMarks || '25'}"
  },
  "answers": [
    {
      "qno": "1",
      "question": "Question statement here...",
      "answer": "Detailed authoritative model answer...",
      "marks": 2,
      "tips": "Teacher grading tips..."
    }
  ]
}

Generate the clean JSON object now.`;

    const user = `Mode: ${mode}
Instructions / Question Paper Text:
${dto.prompt}

Grade/Class: ${dto.grade ?? generalDetails.className ?? 'N/A'}
Subject: ${dto.subject ?? generalDetails.subject ?? 'N/A'}

### CURRICULUM CHAPTER CONTENT:
${context || 'No RAG context available.'}`;

    return this.chat.complete(system, user, true);
  }
}
