import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Analyzer Related APIs')
@ApiBearerAuth()
@Controller('analyzer')
export class AnalyzerController {
    constructor(private readonly analyzerService: AnalyzerService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/word-count')
    async wordCounts(@Body('text') text: string){
       const wordCount = await this.analyzerService.wordCounts(text)
       return { wordCount }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/character-count')
    async characterCounts(@Body('text') text: string){
       const characterCount = await this.analyzerService.characterCounts(text)
       return { characterCount }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/sentence-count')
    async sentenceCounts(@Body('text') text: string){
       const sentenceCount = await this.analyzerService.sentenceCounts(text)
       return { sentenceCount }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/paragraph-count')
    async paragraphCounts(@Body('text') text: string){
       const paragraphCount = await this.analyzerService.paragraphCounts(text)
       return { paragraphCount }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/longest-word')
    async getLongestWord(@Body('text') text: string){
       return await this.analyzerService.getLongestWord(text)
    }
}
