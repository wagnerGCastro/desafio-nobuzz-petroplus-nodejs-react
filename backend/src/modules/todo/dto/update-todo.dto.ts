import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreateTodoDto } from './create-todo.dto';
import { IsDoneEnum } from '../entities/todo.entity';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNotEmpty()
  isDone: IsDoneEnum;

  @IsOptional()
  completedDate: string;
}
