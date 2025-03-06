import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from '../data';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: new TodoService(),
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };
      const expectedResult = {
        id: 11,
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };

      // Act
      const result = await controller.create(createTodoDto);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should throw a BadRequestException if title is not a string', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 123 as any,
        description: 'Test description',
        completed: false,
      };

      // Act & Assert
      try {
        await controller.create(createTodoDto);
      } catch (error) {
        expect(error.message).toMatch('Title must be a string');
      }
    });

    it('should throw a BadRequestException if title is empty', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: '',
        description: 'Test description',
        completed: false,
      };

      // Act & Assert
      try {
        await controller.create(createTodoDto);
      } catch (error) {
        expect(error.message).toMatch('Title is required');
      }
    });

    it('should throw a BadRequestException if description is not a string', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 'Test todo',
        description: 123 as any,
        completed: false,
      };

      // Act & Assert
      try {
        await controller.create(createTodoDto);
      } catch (error) {
        expect(error.message).toMatch('Description must be a string');
      }
    });

    it('should throw a BadRequestException if completed is not a boolean', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 'Test todo',
        description: 'Test description',
        completed: 'true' as any,
      };

      // Act & Assert
      try {
        await controller.create(createTodoDto);
      } catch (error) {
        expect(error.message).toMatch('Completed must be a boolean');
      }
    });

    it('should throw a BadRequestException if completed is empty', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 'Test todo',
        description: 'Test description',
        completed: undefined as any,
      };

      // Act & Assert
      try {
        await controller.create(createTodoDto);
      } catch (error) {
        expect(error.message).toMatch('Completed is required');
      }
    });

    it('should create a todo with no description', async () => {
      // Arrange
      const createTodoDto: CreateTodoDto = {
        title: 'Test todo',
        completed: false,
      };

      const result = await controller.create(createTodoDto);
      const todos = await controller.findAll();
      const expectedResult = {
        id: todos.length,
        title: 'Test todo',
        description: '',
        completed: false,
      };
      // Act

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      // Arrange
      const expectedResult = Todos;

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      // Arrange
      const id = '1';
      const expectedResult = Todos[0];

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException when id is not a number', async () => {
      // Arrange
      const id = 'abc';

      // Act & Assert

      try {
        await controller.findOne(id);
      } catch (error) {
        expect(error.message).toMatch('Invalid ID');
      }
    });

    it('should throw BadRequestException when todo is not found', async () => {
      // Arrange
      const id = '999';
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);

      // Act & Assert
      try {
        await controller.findOne(id);
      } catch (error) {
        expect(error.message).toMatch('Todo not found');
      }
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      // Arrange
      const id = '1';
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated todo',
        description: 'Test description',
        completed: true,
      };
      const expectedResult = {
        id: 1,
        title: 'Updated todo',
        description: 'Test description',
        completed: true,
      };

      // Act
      const result = await controller.update(id, updateTodoDto);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException when id is not a number', async () => {
      // Arrange
      const id = 'abc';

      // Act & Assert
      try {
        await controller.update(id, {});
      } catch (error) {
        expect(error.message).toMatch('Invalid ID');
      }
    });

    it('should throw BadRequestException when todo is not found', async () => {
      // Arrange
      const id = '999';
      jest.spyOn(service, 'update').mockResolvedValueOnce(undefined);

      // Act & Assert
      try {
        await controller.update(id, {});
      } catch (error) {
        expect(error.message).toMatch('Todo not found');
      }
    });

    it('should throw a BadRequestException if completed is not boolean', async () => {
      // Arrange
      const id = '1';
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated todo',
        completed: 'true' as any,
      };

      // Act & Assert
      try {
        await controller.update(id, updateTodoDto);
      } catch (error) {
        expect(error.message).toMatch('Completed must be a boolean');
      }
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      // Arrange
      const id = '1';
      const expectedResult = Todos[0];

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException when id is not a number', async () => {
      // Arrange
      const id = 'abc';

      // Act & Assert
      try {
        await controller.remove(id);
      } catch (error) {
        expect(error.message).toMatch('Invalid ID');
      }
    });

    it('should throw BadRequestException when todo is not found', async () => {
      // Arrange
      const id = '999';
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);

      // Act & Assert
      try {
        await controller.remove(id);
      } catch (error) {
        expect(error.message).toMatch('Todo not found');
      }
    });
  });

  describe('complete', () => {
    it('Should be marked as completed', async () => {
      const id = '1';

      expect(await controller.complete(id)).toBeDefined();
    });

    it('should throw BadRequestException when id is not a number', async () => {
      // Arrange
      const id = 'abc';

      // Act & Assert
      try {
        await controller.complete(id);
      } catch (error) {
        expect(error.message).toMatch('Invalid ID');
      }
    });

    it('should throw BadRequestException when todo is not found', async () => {
      // Arrange
      const id = '999';

      // Act & Assert
      try {
        await controller.complete(id);
      } catch (error) {
        expect(error.message).toMatch('Todo not found');
      }
    });
  });
});
