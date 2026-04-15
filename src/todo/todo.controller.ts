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
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(
    @Query('cursor', new ParseIntPipe({ optional: true })) cursor?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.todoService.getTodos({ cursor, take });
  }

  @Get(':id')
  getTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getSingleTodo(id);
  }

  @Post()
  createTodo(@Body(new ValidationPipe()) body: TodoDto) {
    return this.todoService.createTodo(body.title);
  }

  @Put(':id')
  updateTodo(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) body: TodoDto) {
    return this.todoService.updateTodo(id, body.title);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
