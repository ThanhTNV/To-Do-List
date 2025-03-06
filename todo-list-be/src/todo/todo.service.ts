import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from '../data';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos = Todos;

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      ...createTodoDto,
      description: createTodoDto.description || '',
    };
    this.todos.push(newTodo);
    return new Promise((resolve) => resolve(newTodo));
  }

  findAll(): Promise<Todo[]> {
    return new Promise((resolve) => resolve(this.todos));
  }

  findOne(id: number): Promise<Todo | undefined> {
    return new Promise((resolve) => {
      const todo = this.todos.find((todo) => todo.id === id);
      resolve(todo);
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | undefined> {
    const updatedTodo = this.todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      Object.assign(updatedTodo, updateTodoDto);
    }
    return new Promise((resolve) => resolve(updatedTodo));
  }

  remove(id: number): Promise<Todo | undefined> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const deleted_todo = this.todos[index];
    if (index > -1) {
      this.todos.splice(index, 1);
    }
    return new Promise((resolve) => resolve(deleted_todo));
  }
}
