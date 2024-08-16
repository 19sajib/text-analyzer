import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyzerModule } from './analyzer/analyzer.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { config } from './config'
import { AuthModule } from './auth/auth.module';
import { UiModule } from './ui/ui.module';

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongoURI),
    AnalyzerModule,
    AuthModule,
    UiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
