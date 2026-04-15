import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getTodos().find((todo) => todo.id === id);
  }

  @Post()
  createTodo(@Body() body: TodoDto) {
    return this.todoService.createTodo(body.title);
  }

  @Put(':id')
  updateTodo(@Param('id', ParseIntPipe) id: number, @Body() body: TodoDto) {
    return this.todoService.updateTodo(id, body.title);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
