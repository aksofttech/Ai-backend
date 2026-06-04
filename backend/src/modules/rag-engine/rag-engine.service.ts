import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookChunk } from '../../database/entities/book-chunk.entity';
import { Chapter } from '../../database/entities/chapter.entity';
import { ChunkingService } from './services/chunking.service';
import { EmbeddingService } from './services/embedding.service';
import { PdfExtractionService } from './services/pdf-extraction.service';
import { VectorSearchService } from './services/vector-search.service';
import { SemanticSearchDto } from './dto/semantic-search.dto';

@Injectable()
export class RagEngineService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(BookChunk)
    private readonly chunkRepository: Repository<BookChunk>,
    private readonly pdfExtraction: PdfExtractionService,
    private readonly chunking: ChunkingService,
    private readonly embedding: EmbeddingService,
    private readonly vectorSearch: VectorSearchService,
  ) {}

  async ingestPdf(
    tenantId: string,
    chapterId: string,
    fileBuffer: Buffer,
  ): Promise<{ chunksCreated: number }> {
    const chapter = await this.chapterRepository.findOne({
      where: { id: chapterId },
      relations: { book: true },
    });
    if (!chapter || chapter.book.tenantId !== tenantId) {
      throw new NotFoundException('Chapter not found');
    }

    const text = await this.pdfExtraction.extractText(fileBuffer);
    const segments = this.chunking.semanticChunk(text);
    const embeddings = await this.embedding.embedTexts(segments);

    await this.chunkRepository.delete({ chapterId });

    const entities = segments.map((contentText, index) =>
      this.chunkRepository.create({
        chapterId,
        contentText,
        embedding: embeddings[index] ?? null,
      }),
    );
    await this.chunkRepository.save(entities);

    return { chunksCreated: entities.length };
  }

  async semanticSearch(tenantId: string, dto: SemanticSearchDto) {
    const queryEmbedding = await this.embedding.embedQuery(dto.query);
    return this.vectorSearch.search(tenantId, queryEmbedding, {
      chapterId: dto.chapterId,
      bookId: dto.bookId,
      topK: dto.topK,
    });
  }
}
