import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

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
    it('should return a string message', () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };

      // Act
      const result = service.create(createTodoDto);

      // Assert
      expect(result).toEqual('This action adds a new todo');
    });
  });

  describe('findAll', () => {
    it('should return a string message', () => {
      // Act
      const result = service.findAll();

      // Assert
      expect(result).toEqual('This action returns all todo');
    });
  });

  describe('findOne', () => {
    it('should return a string message with the provided id', () => {
      // Arrange
      const id = 1;

      // Act
      const result = service.findOne(id);

      // Assert
      expect(result).toEqual(`This action returns a #${id} todo`);
    });

    it('should handle different id values', () => {
      // Arrange
      const id = 42;

      // Act
      const result = service.findOne(id);

      // Assert
      expect(result).toEqual(`This action returns a #${id} todo`);
    });
  });

  describe('update', () => {
    it('should return a string message with the provided id', () => {
      // Arrange
      const id = 1;
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated todo',
        completed: true,
      };

      // Act
      const result = service.update(id, updateTodoDto);

      // Assert
      expect(result).toEqual(`This action updates a #${id} todo`);
    });

    it('should handle different id values', () => {
      // Arrange
      const id = 99;
      const updateTodoDto: UpdateTodoDto = {
        title: 'Another updated todo',
      };

      // Act
      const result = service.update(id, updateTodoDto);

      // Assert
      expect(result).toEqual(`This action updates a #${id} todo`);
    });
  });

  describe('remove', () => {
    it('should return a string message with the provided id', () => {
      // Arrange
      const id = 1;

      // Act
      const result = service.remove(id);

      // Assert
      expect(result).toEqual(`This action removes a #${id} todo`);
    });

    it('should handle different id values', () => {
      // Arrange
      const id = 123;

      // Act
      const result = service.remove(id);

      // Assert
      expect(result).toEqual(`This action removes a #${id} todo`);
    });
  });
});
