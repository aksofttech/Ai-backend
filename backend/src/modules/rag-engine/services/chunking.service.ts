import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChunkingService {
  constructor(private readonly configService: ConfigService) {}

  semanticChunk(text: string): string[] {
    const chunkSize = this.configService.get<number>('rag.chunkSize') ?? 800;
    const overlap = this.configService.get<number>('rag.chunkOverlap') ?? 100;
    const normalized = text.replace(/\s+/g, ' ').trim();
    if (!normalized) return [];

    const chunks: string[] = [];
    let start = 0;
    while (start < normalized.length) {
      let end = Math.min(start + chunkSize, normalized.length);
      if (end < normalized.length) {
        const boundary = normalized.lastIndexOf('. ', end);
        if (boundary > start + chunkSize * 0.5) {
          end = boundary + 1;
        }
      }
      chunks.push(normalized.slice(start, end).trim());
      if (end >= normalized.length) break;
      start = Math.max(end - overlap, start + 1);
    }
    return chunks.filter(Boolean);
  }
}
