import { Module } from '@nestjs/common';
import { UiController } from './ui.controller';
import { AnalyzerService } from 'src/analyzer/analyzer.service';

@Module({
    imports: [],
    providers: [AnalyzerService],
    controllers: [UiController]
})
export class UiModule {}
