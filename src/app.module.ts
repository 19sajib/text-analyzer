import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyzerModule } from './analyzer/analyzer.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { config } from './config'
import { AuthModule } from './auth/auth.module';
import { UiModule } from './ui/ui.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,  // time to live in seconds
      limit: 10 // max number of requests within the ttl
    }]),
    TypegooseModule.forRoot(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AnalyzerModule,
    AuthModule,
    UiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
