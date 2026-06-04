import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../database/entities/book.entity';
import { Chapter } from '../../database/entities/chapter.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  async createBook(tenantId: string, dto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create({ ...dto, tenantId });
    return this.bookRepository.save(book);
  }

  async findAllBooks(tenantId: string): Promise<Book[]> {
    return this.bookRepository.find({
      where: { tenantId },
      relations: { chapters: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findBook(tenantId: string, bookId: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId, tenantId },
      relations: { chapters: true },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(
    tenantId: string,
    bookId: string,
    dto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.findBook(tenantId, bookId);
    Object.assign(book, dto);
    return this.bookRepository.save(book);
  }

  async deleteBook(tenantId: string, bookId: string): Promise<void> {
    const book = await this.findBook(tenantId, bookId);
    await this.bookRepository.remove(book);
  }

  async createChapter(
    tenantId: string,
    bookId: string,
    dto: CreateChapterDto,
  ): Promise<Chapter> {
    await this.findBook(tenantId, bookId);
    const chapter = this.chapterRepository.create({ ...dto, bookId });
    return this.chapterRepository.save(chapter);
  }

  async findChapters(tenantId: string, bookId: string): Promise<Chapter[]> {
    await this.findBook(tenantId, bookId);
    return this.chapterRepository.find({
      where: { bookId },
      order: { createdAt: 'ASC' },
    });
  }

  async findChapter(
    tenantId: string,
    bookId: string,
    chapterId: string,
  ): Promise<Chapter> {
    await this.findBook(tenantId, bookId);
    const chapter = await this.chapterRepository.findOne({
      where: { id: chapterId, bookId },
      relations: { chunks: true },
    });
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    return chapter;
  }
}
