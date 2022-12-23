import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @Inject(UsersService)
    private userService: UsersService,

    @Inject('server') private readonly client: ClientProxy,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: any) {
    createTaskDto.user = { id: userId };
    return await this.tasksRepository.save(createTaskDto);
  }

  findAll(userId: null | number) {
    const result = this.tasksRepository
      .createQueryBuilder('task')
      .leftJoin('task.user', 'user')
      .select(
        'task.id as id, task.summary as summay, task.status as status, task.name as name, user.username as owner',
      );

    if (userId) return result.where({ user: userId }).getRawMany();
    return result.getRawMany();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: any) {
    const dataToUpdate = { ...updateTaskDto, ...{ id } };
    const searchParams = userId ? { id, user: userId } : { id };
    try {
      const { affected } = await this.tasksRepository.update(searchParams, {
        ...dataToUpdate,
      });
      if (affected) {
        const userData = await this.userService.findUserRoleById(userId);
        this.client.emit('taskPerformed', userData);
      }
      return affected ?? false;
    } catch (error) {
      console.log(error);
    }
  }
}
