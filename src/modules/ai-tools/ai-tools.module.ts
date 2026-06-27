import { Module } from '@nestjs/common';
import { RagEngineModule } from '../rag-engine/rag-engine.module';
import { AiOrchestratorService } from './ai-orchestrator.service';
import { AiToolsController } from './ai-tools.controller';
import { HomeworkService } from './services/homework.service';
import { LessonPlanService } from './services/lesson-plan.service';
import { OpenaiChatService } from './services/openai-chat.service';
import { PptService } from './services/ppt.service';
import { WorksheetService } from './services/worksheet.service';
import { CustomWorksheetService } from './services/custom-worksheet.service';
import { TestPaperService } from './services/test-paper.service';
import { GamifiedQuizService } from './services/gamified-quiz.service';
import { AnswerKeyService } from './services/answer-key.service';

@Module({
  imports: [RagEngineModule],
  controllers: [AiToolsController],
  providers: [
    AiOrchestratorService,
    OpenaiChatService,
    WorksheetService,
    CustomWorksheetService,
    LessonPlanService,
    PptService,
    HomeworkService,
    TestPaperService,
    GamifiedQuizService,
    AnswerKeyService,
  ],
  exports: [AiOrchestratorService],
})
export class AiToolsModule {}
