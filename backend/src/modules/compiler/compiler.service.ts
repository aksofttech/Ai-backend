import { Injectable } from '@nestjs/common';
import { PdfkitCompilerService } from './services/pdfkit-compiler.service';
import { PuppeteerCompilerService } from './services/puppeteer-compiler.service';
import { PptxCompilerService } from './services/pptx-compiler.service';

@Injectable()
export class CompilerService {
  constructor(
    private readonly pdfkit: PdfkitCompilerService,
    private readonly puppeteer: PuppeteerCompilerService,
    private readonly pptx: PptxCompilerService,
  ) {}

  compileMarkdownPdf(title: string, markdown: string) {
    return this.pdfkit.markdownToPdfBuffer(title, markdown);
  }

  compileHtmlPdf(html: string) {
    return this.puppeteer.htmlToPdfBuffer(html);
  }

  compilePptx(title: string, slidesJson: string) {
    return this.pptx.slidesToBuffer(title, slidesJson);
  }
}
