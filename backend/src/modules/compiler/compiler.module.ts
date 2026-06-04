import { Module } from '@nestjs/common';
import { CompilerController } from './compiler.controller';
import { CompilerService } from './compiler.service';
import { PdfkitCompilerService } from './services/pdfkit-compiler.service';
import { PuppeteerCompilerService } from './services/puppeteer-compiler.service';
import { PptxCompilerService } from './services/pptx-compiler.service';

@Module({
  controllers: [CompilerController],
  providers: [
    CompilerService,
    PdfkitCompilerService,
    PuppeteerCompilerService,
    PptxCompilerService,
  ],
  exports: [CompilerService],
})
export class CompilerModule {}
