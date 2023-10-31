import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

// findAll
const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: 1, name: 'task-1', description: 'Lorem Ipsum is simply dummy text of the', isDone: 0 }),
  new TodoEntity({ id: 2, name: 'task-2', description: 'Lorem Ipsum is simply dummy text of the', isDone: 0 }),
  new TodoEntity({ id: 3, name: 'task-3', description: 'Lorem Ipsum is simply dummy text of the', isDone: 0 }),
];

// Create
const bodyCreated: CreateTodoDto = { name: 'new-task', description: 'Lorem Ipsum is simply dummy text of the' };
const newTodoEntity = new TodoEntity(bodyCreated);

// Update
const bodyUpdated: UpdateTodoDto = { name: 'task-1', description: 'Updated tsaks', isDone: 1 };
const updatedTodoEntity = new TodoEntity(bodyUpdated);

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('index', () => {
    it('should return a todo list entity successfully', async () => {
      const result = await todoController.index();

      expect(result).toEqual(todoEntityList);
      expect(typeof result).toEqual('object');
      expect(todoService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      expect(todoController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new todo item successfully', async () => {
      const result = await todoController.create(bodyCreated);

      expect(result).toEqual(newTodoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toBeCalledWith(bodyCreated);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      expect(todoController.create(bodyCreated)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get a todo item successfully', async () => {
      const result = await todoController.show(1);

      expect(result).toEqual(todoEntityList[0]);
      expect(todoService.findOneOrFail).toBeCalledTimes(1);
      expect(todoService.findOneOrFail).toBeCalledWith(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(todoService, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(todoController.show(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      const result = await todoController.update(1, bodyUpdated);

      expect(result).toEqual(updatedTodoEntity);
      expect(todoService.update).toBeCalledTimes(1);
      expect(todoService.update).toHaveBeenCalledWith(1, bodyUpdated);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());

      expect(todoController.update(1, bodyUpdated)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a todo item successfully', async () => {
      const result = await todoController.destroy(1);

      expect(result).toBeUndefined();
      expect(todoService.deleteById).toBeCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'deleteById').mockRejectedValueOnce(new Error());

      expect(todoController.destroy(1)).rejects.toThrowError();
    });
  });
});
