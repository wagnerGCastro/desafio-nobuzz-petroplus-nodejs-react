import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOneOrFail(id: number) {
    try {
      return await this.todoRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateTodoDto) {
    const todo = this.todoRepository.create(data);
    return await this.todoRepository.save(todo);
  }

  async update(id: number, data: UpdateTodoDto) {
    const todo = await this.findOneOrFail(id);
    this.todoRepository.merge(todo, data);
    return await this.todoRepository.save(todo);
  }

  async deleteById(id: number) {
    await this.findOneOrFail(id);
    await this.todoRepository.softDelete(id);
  }
}
