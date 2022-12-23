import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ClientsModule.register([
      {
        name: 'server',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'main_queue',
          noAck: true,
          persistent: true,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
