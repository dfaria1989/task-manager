import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { RolesAuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RolesAuthGuard, ACGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseRoles({
    resource: 'tasks',
    action: 'create',
    possession: 'own',
  })
  @Post()
  create(@Request() { user: { id: userId } }, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @UseRoles({
    resource: 'tasks',
    action: 'read',
    possession: 'own',
  })
  @Get()
  findAll(@Request() { user }) {
    const {
      permissions: { readAny },
      id: userId,
    } = user;
    return this.tasksService.findAll(!readAny ? userId : null);
  }

  @UseRoles({
    resource: 'tasks',
    action: 'update',
    possession: 'own',
  })
  @Patch(':id')
  update(@Request() { user }, @Param('id') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    const {
      permissions: { updateAny },
      id: userId,
    } = user;
    return this.tasksService.update(+taskId, updateTaskDto, !updateAny ? userId : null);
  }
}
