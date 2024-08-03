import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
// import * as csurf from 'csurf';
// import cookieParser from "cookie-parser";


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.use(cookieParser());
  // app.use(csurf());
  const port = process.env.PORT || 3001
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();