import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Invalid ID');
    }

    const todo = await this.todoService.findOne(+id);

    if (!todo) {
      throw new BadRequestException('Todo not found');
    }

    return todo;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    if (isNaN(+id)) {
      throw new BadRequestException('Invalid ID');
    }

    const updatedTodo = await this.todoService.update(+id, updateTodoDto);

    if (!updatedTodo) {
      throw new BadRequestException('Todo not found');
    }

    return updatedTodo;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Invalid ID');
    }

    const removedTodo = await this.todoService.remove(+id);

    if (!removedTodo) {
      throw new BadRequestException('Todo not found');
    }

    return removedTodo;
  }

  @Post(':id')
  async complete(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Invalid ID');
    }

    const completedTodo = await this.todoService.checkCompleted(+id);

    if (!completedTodo) {
      throw new BadRequestException('Todo not found');
    }

    return completedTodo;
  }
}
