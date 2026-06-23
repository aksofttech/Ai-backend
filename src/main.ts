import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // CORS setup: Sirf apne Vercel frontend ko allow karein
  app.enableCors({
    origin: ['http://localhost:3000', 'https://ai-frontend-ruby-alpha.vercel.app'], // Apna Vercel ka exact URL yahan daalein
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Agar cookies/tokens use kar rahe hain
  });

  const port = process.env.PORT ?? 4001;
  await app.listen(port);
  console.log(`Yugsoft Tech API running on http://localhost:${port}/api/v1`);
}
bootstrap();
