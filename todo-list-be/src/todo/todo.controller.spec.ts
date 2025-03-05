import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  // Create a properly typed mock service
  const mockTodoService = {
    create: jest.fn().mockImplementation((dto: CreateTodoDto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    findAll: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          title: 'Test todo 1',
          description: 'Test description 1',
          completed: false,
        },
        {
          id: 2,
          title: 'Test todo 2',
          description: 'Test description 2',
          completed: true,
        },
      ];
    }),
    findOne: jest.fn().mockImplementation((id: number) => {
      return {
        id,
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };
    }),
    update: jest.fn().mockImplementation((id: number, dto: UpdateTodoDto) => {
      return {
        id,
        title: dto.title || 'Default title',
        description: 'Test description',
        completed: dto.completed !== undefined ? dto.completed : false,
      };
    }),
    remove: jest.fn().mockImplementation((id: number) => {
      return {
        id,
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
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
        id: 1,
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };

      // Act
      const result = await controller.create(createTodoDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      // Arrange
      const expectedResult = [
        {
          id: 1,
          title: 'Test todo 1',
          description: 'Test description 1',
          completed: false,
        },
        {
          id: 2,
          title: 'Test todo 2',
          description: 'Test description 2',
          completed: true,
        },
      ];

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      // Arrange
      const id = '1';
      const expectedResult = {
        id: 1,
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      // Arrange
      const id = '1';
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated todo',
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
      expect(service.update).toHaveBeenCalledWith(+id, updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      // Arrange
      const id = '1';
      const expectedResult = {
        id: 1,
        title: 'Test todo',
        description: 'Test description',
        completed: false,
      };

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
