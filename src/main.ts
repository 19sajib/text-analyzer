import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express';

const setupSwagger = (app: INestApplication) => {
	const options = new DocumentBuilder()
		.setTitle('Text Analyzer Service API Operations')
		.setDescription('Rest API docs')
		.addBearerAuth({ description: 'User JWT Token', type: 'http', name: 'Authorization', bearerFormat: 'JWT' })
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document, { swaggerOptions: { persistAuthorization: true } });
};

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes( new ValidationPipe({transform: false}))
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const logger = new Logger('Startup');
  setupSwagger(app);

  await app.listen(config.port);
  logger.log(`App Started on http://localhost:${config.port}/api`);
}
bootstrap();
