import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

@Injectable()
export class PdfkitCompilerService {
  async markdownToPdfBuffer(title: string, markdown: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(18).text(title, { underline: true });
      doc.moveDown();
      doc.fontSize(11).text(markdown, { align: 'left' });
      doc.end();
    });
  }

  bufferToStream(buffer: Buffer): Readable {
    return Readable.from(buffer);
  }
}
