import { Controller, Get, Render, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AnalyzerService } from '../analyzer/analyzer.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ui Controller')
@Controller('ui')
export class UiController {
  constructor(
    private readonly textAnalyzerService: AnalyzerService,
  ) {}

  @Get('/')
  @Render('index')
  root() {
    return { title: 'Text Analysis', message: 'Enter text for analysis' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/analyze')
  @Render('analysis')
  async analyzeText(@Body('text') text: string) {
    const wordCount = await this.textAnalyzerService.wordCounts(text);
    const charCount = await this.textAnalyzerService.characterCounts(text);
    const sentenceCount = await this.textAnalyzerService.sentenceCounts(text);
    const paragraphCount = await this.textAnalyzerService.paragraphCounts(text);
    const longestWords = await this.textAnalyzerService.getLongestWord(text);

    return  {
      text,
      wordCount,
      charCount,
      sentenceCount,
      paragraphCount,
      longestWords,
    };
  }

  @Get('/login')
  @Render('login')
  loginPage() {
    return { title: 'Login' };
  }

  @Get('/register')
  @Render('register')
  RegisterPage() {
    return { title: 'Register' };
  }

}
