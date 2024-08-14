import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Analyzer Related APIs')
@Controller('analyzer')
export class AnalyzerController {
    constructor(private readonly analyzerService: AnalyzerService) {}

    @Post('/word-count')
    async wordCounts(@Body('text') text: string){
       return await this.analyzerService.wordCounts(text)
    }

    @Post('/character-count')
    async characterCounts(@Body('text') text: string){
       return await this.analyzerService.characterCounts(text)
    }

    @Post('/sentence-count')
    async sentenceCounts(@Body('text') text: string){
       return await this.analyzerService.sentenceCounts(text)
    }
    @Post('/paragraph-count')
    async paragraphCounts(@Body('text') text: string){
       return await this.analyzerService.paragraphCounts(text)
    }

    @Post('/longest-word')
    async getLongestWord(@Body('text') text: string){
       return await this.analyzerService.getLongestWord(text)
    }
}
