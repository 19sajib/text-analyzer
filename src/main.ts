import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

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
  const port = process.env.PORT || 4949;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes( new ValidationPipe())
  const logger = new Logger('Startup');
  setupSwagger(app);
  await app.listen(port);
  logger.log(`App Started on http://localhost:${port}/api`);
}
bootstrap();
