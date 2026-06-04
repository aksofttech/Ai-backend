import { Injectable, BadRequestException } from '@nestjs/common';
import PptxGenJS from 'pptxgenjs';

export interface SlideDefinition {
  title: string;
  bullets: string[];
}

@Injectable()
export class PptxCompilerService {
  async slidesToBuffer(
    title: string,
    slidesJson: string,
  ): Promise<Buffer> {
    let slides: SlideDefinition[];
    try {
      slides = JSON.parse(slidesJson) as SlideDefinition[];
    } catch {
      throw new BadRequestException('Invalid PPT JSON from AI orchestrator');
    }

    const pptx = new PptxGenJS();
    pptx.author = 'Yugsoft Tech';
    pptx.title = title;

    const titleSlide = pptx.addSlide();
    titleSlide.addText(title, {
      x: 0.5,
      y: 2,
      w: 9,
      h: 1.5,
      fontSize: 28,
      bold: true,
    });

    for (const slide of slides) {
      const s = pptx.addSlide();
      s.addText(slide.title, {
        x: 0.5,
        y: 0.4,
        w: 9,
        h: 0.8,
        fontSize: 22,
        bold: true,
      });
      if (slide.bullets?.length) {
        s.addText(
          slide.bullets.map((b) => ({ text: b, options: { bullet: true } })),
          { x: 0.7, y: 1.4, w: 8.5, h: 4.5, fontSize: 14 },
        );
      }
    }

    const output = await pptx.write({ outputType: 'nodebuffer' });
    return output as Buffer;
  }
}
