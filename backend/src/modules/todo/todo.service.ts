import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  async findAll() {
    return `This action returns all todo`;
  }

  async findOneOrFail(id: number) {
    return `This action returns a #${id} todo`;
  }

  async create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  async deleteById(id: number) {
    return `This action removes a #${id} todo`;
  }
}
