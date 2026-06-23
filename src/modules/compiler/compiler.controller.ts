import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { IsString, MaxLength } from 'class-validator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { CompilerService } from './compiler.service';

class CompileMarkdownDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  markdown: string;
}

class CompileHtmlDto {
  @IsString()
  html: string;
}

class CompilePptxDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  slidesJson: string;
}

@Controller('compiler')
export class CompilerController {
  constructor(private readonly compilerService: CompilerService) {}

  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post('pdf/markdown')
  async pdfFromMarkdown(
    @Body() dto: CompileMarkdownDto,
    @Res() res: Response,
  ) {
    const buffer = await this.compilerService.compileMarkdownPdf(
      dto.title,
      dto.markdown,
    );
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${dto.title}.pdf"`,
    });
    res.send(buffer);
  }

  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post('pdf/html')
  async pdfFromHtml(@Body() dto: CompileHtmlDto, @Res() res: Response) {
    const buffer = await this.compilerService.compileHtmlPdf(dto.html);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    });
    res.send(buffer);
  }

  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post('pptx')
  async pptxFromJson(@Body() dto: CompilePptxDto, @Res() res: Response) {
    const buffer = await this.compilerService.compilePptx(
      dto.title,
      dto.slidesJson,
    );
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': `attachment; filename="${dto.title}.pptx"`,
    });
    res.send(buffer);
  }
}
