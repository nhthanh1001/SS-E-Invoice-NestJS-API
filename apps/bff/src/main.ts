/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    const globalPrefix = AppModule.CONFIGURATION.GLOBAL_PREFIX;
    app.setGlobalPrefix(globalPrefix);
    app.enableCors({
      origin: '*',
    });
    // Swagger Documentation
    const config = new DocumentBuilder()
      .setTitle('E-Invoice-bff API')
      .setDescription('The E-Invoice-bff API description')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      })
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory);

    const port = AppModule.CONFIGURATION.APP_CONFIG.PORT;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    Logger.log(`📖 Swagger documentation is available on: http://localhost:${port}/${globalPrefix}/docs`);
  } catch (error) {
    Logger.error(`❌ Failed to start the application: ${error}`, '', 'Bootstrap', false);
  }
}

bootstrap();
