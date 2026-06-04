import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class EmbeddingService {
  private readonly client: OpenAI | null;
  private readonly model: string;
  private readonly dimensions: number;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai.apiKey');
    this.client = apiKey ? new OpenAI({ apiKey }) : null;
    this.model =
      this.configService.get<string>('openai.embeddingModel') ??
      'text-embedding-3-small';
    this.dimensions =
      this.configService.get<number>('rag.embeddingDimensions') ?? 1536;
  }

  async embedTexts(texts: string[]): Promise<number[][]> {
    if (!this.client) {
      throw new ServiceUnavailableException('OpenAI API key not configured');
    }
    if (!texts.length) return [];

    const response = await this.client.embeddings.create({
      model: this.model,
      input: texts,
      dimensions: this.dimensions,
    });

    return response.data
      .sort((a, b) => a.index - b.index)
      .map((item) => item.embedding);
  }

  async embedQuery(query: string): Promise<number[]> {
    const [embedding] = await this.embedTexts([query]);
    return embedding;
  }
}
