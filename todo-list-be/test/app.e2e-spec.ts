import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTodoDto } from '../src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '../src/todo/dto/update-todo.dto';

describe('TodoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Todo API', () => {
    // Test for creating a todo
    it('/todo (POST)', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'E2E Test Todo',
        description: 'Testing todo creation via E2E',
        completed: false,
      };

      return request(app.getHttpServer())
        .post('/todo')
        .send(createTodoDto)
        .expect(201) // NestJS returns 201 for POST by default
        .expect('This action adds a new todo');
    });

    // Test for getting all todos
    it('/todo (GET)', () => {
      return request(app.getHttpServer())
        .get('/todo')
        .expect(200)
        .expect('This action returns all todo');
    });

    // Test for getting a specific todo
    it('/todo/:id (GET)', () => {
      const id = 1;
      return request(app.getHttpServer())
        .get(`/todo/${id}`)
        .expect(200)
        .expect(`This action returns a #${id} todo`);
    });

    // Test for updating a todo
    it('/todo/:id (PATCH)', () => {
      const id = 1;
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated E2E Test Todo',
        completed: true,
      };

      return request(app.getHttpServer())
        .patch(`/todo/${id}`)
        .send(updateTodoDto)
        .expect(200)
        .expect(`This action updates a #${id} todo`);
    });

    // Test for deleting a todo
    it('/todo/:id (DELETE)', () => {
      const id = 1;
      return request(app.getHttpServer())
        .delete(`/todo/${id}`)
        .expect(200)
        .expect(`This action removes a #${id} todo`);
    });

    // Test for handling non-existent todo
    it('/todo/999 (GET) - handles non-existent todo', () => {
      const id = 999;
      return request(app.getHttpServer())
        .get(`/todo/${id}`)
        .expect(200) // Currently it will return 200 since we're just returning strings
        .expect(`This action returns a #${id} todo`);
    });

    // Test for handling invalid ID
    it('/todo/invalid (GET) - handles invalid ID', () => {
      return request(app.getHttpServer()).get('/todo/invalid').expect(400); // NestJS should return 400 for invalid parameter types
    });
  });
});
