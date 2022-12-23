import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './filters/exception.filter';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EventsModule } from './events/events.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'log', 'warn', 'verbose'],
    abortOnError: false,
    rawBody: true,
  });
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true,
      disableErrorMessages: false,
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(3000);

  const appMicro = await NestFactory.createMicroservice<MicroserviceOptions>(EventsModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await appMicro.listen();

}
bootstrap();
