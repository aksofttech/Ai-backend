import { Body, Controller, Param, Post, ForbiddenException, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { AiOrchestratorService } from './ai-orchestrator.service';
import { AiToolType } from './ai-tool-type';
import { GenerateContentDto } from './dto/generate-content.dto';
import { PdfExtractionService } from '../rag-engine/services/pdf-extraction.service';

@Controller('ai-tools')
export class AiToolsController {
  constructor(
    private readonly orchestrator: AiOrchestratorService,
    private readonly pdfExtraction: PdfExtractionService,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post('extract-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async extractPdf(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No PDF file uploaded');
    }
    const pages = await this.pdfExtraction.extractText(file.buffer);
    const fullText = pages.map(p => p.text).join('\n\n');
    return { text: fullText, pageCount: pages.length };
  }

  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
  @Post(':tool/generate')
  generate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('tool') tool: string,
    @Body() dto: GenerateContentDto,
  ) {
    if (user.role === UserRole.STUDENT && tool !== 'gamified-quiz') {
      throw new ForbiddenException('Students can only access the Gamified Quiz Generator');
    }

    return this.orchestrator.generate(
      user.tenantId,
      tool as AiToolType,
      dto,
    );
  }
}
