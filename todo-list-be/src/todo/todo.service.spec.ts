import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from '../data';

const MockTodos = Todos;

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo and return it', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 'New todo',
        description: 'This is a new todo',
        completed: false,
      };

      // Act
      const result = await service.create(createTodoDto);

      // Assert
      expect(result).toEqual({
        id: expect.any(Number),
        ...createTodoDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(MockTodos.length);
      expect(result[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          completed: expect.any(Boolean),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return a todo when id exists', async () => {
      // Arrange
      const id = 1;

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          id,
          title: expect.any(String),
          description: expect.any(String),
          completed: expect.any(Boolean),
        }),
      );
    });

    it('should return undefined when id does not exist', async () => {
      // Arrange
      const id = 999;

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a todo and return it when id exists', async () => {
      // Arrange
      const id = 1;
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated todo',
        completed: true,
      };

      // Act
      const result = await service.update(id, updateTodoDto);

      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          id,
          title: updateTodoDto.title,
          completed: updateTodoDto.completed,
        }),
      );
    });

    it('should return undefined when id does not exist', async () => {
      // Arrange
      const id = 999;
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated todo',
      };

      // Act
      const result = await service.update(id, updateTodoDto);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a todo and return it when id exists', async () => {
      // Arrange
      const id = 2;
      const todoBeforeRemoval = MockTodos.find((todo) => todo.id === id);

      // Act
      const result = await service.remove(id);

      // Assert
      expect(result).toEqual(todoBeforeRemoval);

      // Verify todo is removed
      const todoAfterRemoval = await service.findOne(id);
      expect(todoAfterRemoval).toBeUndefined();
    });

    it('should return undefined when id does not exist', async () => {
      // Arrange
      const id = 999;

      // Act
      const result = await service.remove(id);

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
