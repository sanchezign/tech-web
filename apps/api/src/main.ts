import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Disable default logger — nestjs-pino will take over after flushLogs()
    bufferLogs: true,
  });

  // Use Pino as the application logger
  app.useLogger(app.get(Logger));
  app.flushLogs();

  // Global API prefix — all routes under /api/v1
  app.setGlobalPrefix('api/v1');

  // CORS — tighten origins in production
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });

  // Global exception filter — consistent error shape across all routes
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // Global validation pipe — strips unknown fields, coerces types
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}

bootstrap();
