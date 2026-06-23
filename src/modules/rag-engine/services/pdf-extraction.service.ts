import { Injectable, BadRequestException, ServiceUnavailableException, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';
import * as Tesseract from 'tesseract.js';

export interface PageText {
  pageNumber: number;
  text: string;
}

@Injectable()
export class PdfExtractionService {
  private readonly logger = new Logger(PdfExtractionService.name);

  async extractText(buffer: Buffer): Promise<PageText[]> {
    if (!buffer?.length) {
      throw new BadRequestException('Empty PDF buffer');
    }

    const tempDirId = uuidv4();
    const tempDirPath = path.join(os.tmpdir(), tempDirId);
    const tempPdfPath = path.join(tempDirPath, 'document.pdf');
    const pages: PageText[] = [];

    try {
      // 1. Setup Temporary Directory
      await fs.promises.mkdir(tempDirPath, { recursive: true });
      await fs.promises.writeFile(tempPdfPath, buffer);

      // 2. Convert PDF to Images using mupdf
      this.logger.log(`Converting PDF to images in ${tempDirPath}`);
      
      try {
        // Use dynamic import for ESM module support in NestJS/CJS
        const mupdf = await eval('import("mupdf")');
        const document = mupdf.Document.openDocument(buffer, "application/pdf");
        
        let pageNumber = 1;
        for (let i = 0; i < document.countPages(); i++) {
          const page = document.loadPage(i);
          // scale(2, 2) provides better DPI/quality for OCR
          const pixmap = page.toPixmap(mupdf.Matrix.scale(2, 2), mupdf.ColorSpace.DeviceRGB, false);
          
          const imagePath = path.join(tempDirPath, `page-${pageNumber}.png`);
          const pngData = pixmap.asPNG();
          await fs.promises.writeFile(imagePath, pngData);
          pageNumber++;
        }
      } catch (convertError: any) {
        this.logger.error(`mupdf conversion failed: ${convertError.message}`, convertError.stack);
        throw new ServiceUnavailableException(`PDF conversion failed: ${convertError.message}`);
      }

      // 3. Find generated images
      const files = await fs.promises.readdir(tempDirPath);
      const imageFiles = files
        .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'))
        // pdf-poppler generates files like page-1.jpg, page-2.jpg
        // Need to sort them correctly
        .sort((a, b) => {
          const numA = parseInt(a.replace(/[^0-9]/g, ''), 10) || 0;
          const numB = parseInt(b.replace(/[^0-9]/g, ''), 10) || 0;
          return numA - numB;
        });

      if (imageFiles.length === 0) {
        throw new BadRequestException('Could not extract any pages from the PDF.');
      }

      this.logger.log(`Found ${imageFiles.length} pages. Starting Tesseract OCR...`);

      // 4. Run Tesseract OCR sequentially to avoid memory bloat
      let pageIndex = 1;
      for (const imgFile of imageFiles) {
        const imgPath = path.join(tempDirPath, imgFile);
        this.logger.log(`Running OCR on page ${pageIndex}/${imageFiles.length}...`);

        const { data } = await Tesseract.recognize(imgPath, 'eng');

        pages.push({
          pageNumber: pageIndex,
          text: data.text.trim() || '[Blank Page]'
        });
        pageIndex++;
      }

      this.logger.log(`OCR complete. Extracted ${pages.length} pages.`);
      return pages;

    } catch (error: any) {
      this.logger.error(`OCR Extraction failed: ${error.message}`, error.stack);
      throw new ServiceUnavailableException(`OCR Extraction failed: ${error.message}`);
    } finally {
      // 5. Cleanup Temporary Files
      try {
        await fs.promises.rm(tempDirPath, { recursive: true, force: true });
        this.logger.log(`Cleaned up temporary directory: ${tempDirPath}`);
      } catch (cleanupError: any) {
        this.logger.error(`Failed to clean up temp directory ${tempDirPath}: ${cleanupError.message}`);
      }
    }
  }
}
