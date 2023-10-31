import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<TodoEntity>;

  const todoEntityList: TodoEntity[] = [
    new TodoEntity({ id: 1, name: 'task-1', description: 'Lorem Ipsum is simply dummy text of the', isDone: 0 }),
    new TodoEntity({ id: 2, name: 'task-2', description: 'Lorem Ipsum is simply dummy text of the', isDone: 0 }),
    new TodoEntity({ id: 3, name: 'task-3', description: 'Lorem Ipsum is simply dummy text of the', isDone: 0 }),
  ];

  const updatedTodoEntityItem = new TodoEntity({
    name: 'task-1',
    description: 'Lorem Ipsum is simply dummy text of the',
    isDone: 1,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(todoEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            create: jest.fn().mockReturnValue(todoEntityList[0]),
            merge: jest.fn().mockReturnValue(updatedTodoEntityItem),
            save: jest.fn().mockResolvedValue(todoEntityList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(getRepositoryToken(TodoEntity));
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a todo entity list successfully', async () => {
      const result = await todoService.findAll();

      expect(result).toEqual(todoEntityList);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());

      expect(todoService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a todo entity item successfully', async () => {
      const result = await todoService.findOneOrFail(1);

      expect(result).toEqual(todoEntityList[0]);
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(todoRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(todoService.findOneOrFail(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new todo entity item successfully', async () => {
      const data: CreateTodoDto = {
        name: 'task-1',
        description: 'Lorem Ipsum is simply dummy text of the',
      };

      const result = await todoService.create(data);

      expect(result).toEqual(todoEntityList[0]);
      expect(todoRepository.create).toHaveBeenCalledTimes(1);
      expect(todoRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const data: CreateTodoDto = {
        name: 'task-1',
        description: 'Lorem Ipsum is simply dummy text of the',
      };

      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      expect(todoService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo entity item successfully', async () => {
      const data: UpdateTodoDto = {
        name: 'task-1',
        description: 'Lorem Ipsum is simply dummy text of the',
        isDone: 1,
      };

      jest.spyOn(todoRepository, 'save').mockResolvedValueOnce(updatedTodoEntityItem);

      const result = await todoService.update(1, data);

      expect(result).toEqual(updatedTodoEntityItem);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(todoRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

      const data: UpdateTodoDto = {
        name: 'task-1',
        description: 'Lorem Ipsum is simply dummy text of the',
        isDone: 1,
      };

      expect(todoService.update(1, data)).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      const data: UpdateTodoDto = {
        name: 'task-1',
        description: 'Lorem Ipsum is simply dummy text of the',
        isDone: 1,
      };

      expect(todoService.update(1, data)).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('should delete a todo entity item successfully', async () => {
      const result = await todoService.deleteById(1);

      expect(result).toBeUndefined();
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(todoRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(todoService.deleteById(1)).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoRepository, 'softDelete').mockRejectedValueOnce(new Error());

      expect(todoService.deleteById(1)).rejects.toThrowError();
    });
  });
});
