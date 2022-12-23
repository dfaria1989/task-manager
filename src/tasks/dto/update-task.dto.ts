import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TaskStatus {
  CREATED = 'created',
  FINISHED = 'finished',
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: string;
}
