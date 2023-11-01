import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index() {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.todoService.findOneOrFail(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.todoService.deleteById(+id);
  }
}
