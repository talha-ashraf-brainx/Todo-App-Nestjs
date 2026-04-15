import { Injectable, HttpException, HttpStatus } from '@nestjs/common';


type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

@Injectable()
export class TodoService {
  private counter = 0;
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  getSingleTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  createTodo(title: string) {
    this.counter++;
    const todo: Todo = { id: this.counter, title, completed: false };
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id: number, title: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    todo.title = title;
    return todo;
  }

  deleteTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return todo;
  }
}
