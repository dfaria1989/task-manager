import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class EventsController {
  constructor() {}

  @EventPattern('taskPerformed')
  taskPerformed(data: any) {
    const { username, updatedAt } = data[0];
    console.log(`${username} performed the task in ${updatedAt}`);
  }
}
