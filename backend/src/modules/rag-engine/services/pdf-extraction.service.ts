import { Injectable, BadRequestException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse');

@Injectable()
export class PdfExtractionService {
  async extractText(buffer: Buffer): Promise<string> {
    if (!buffer?.length) {
      throw new BadRequestException('Empty PDF buffer');
    }
    const result = await pdfParse(buffer);
    const text = (result.text as string)?.trim();
    if (!text) {
      throw new BadRequestException('No extractable text found in PDF');
    }
    return text;
  }
}
