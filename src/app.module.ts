import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyzerModule } from './analyzer/analyzer.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { config } from './config'

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongoURI),
    AnalyzerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
