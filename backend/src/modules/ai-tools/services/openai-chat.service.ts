import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiChatService {
  private readonly client: OpenAI | null;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai.apiKey');
    this.client = apiKey ? new OpenAI({ apiKey }) : null;
    this.model =
      this.configService.get<string>('openai.chatModel') ?? 'gpt-4o-mini';
  }

  async complete(systemPrompt: string, userPrompt: string): Promise<string> {
    if (!this.client) {
      throw new ServiceUnavailableException('OpenAI API key not configured');
    }

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() ?? '';
  }
}
