import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type { Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodos(args?: { cursor?: number; take?: number }): Promise<Todo[]> {
    const cursor = args?.cursor;
    const take = args?.take;
    const orderBy = { id: 'asc' as const };

    if (cursor === undefined && take === undefined) {
      return await this.prisma.todo.findMany({ orderBy });
    }

    if (cursor === undefined) {
      return await this.prisma.todo.findMany({ take, orderBy });
    }

    if (take === undefined) {
      return await this.prisma.todo.findMany({
        where: { id: { gt: cursor } },
        orderBy,
      });
    }

    return await this.prisma.todo.findMany({
      cursor: { id: cursor },
      take,
      orderBy,
    });
  }

  async getSingleTodo(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async createTodo(title: string) {
    return await this.prisma.todo.create({
      data: {
        title,
        completed: false,
      },
    });
  }

  async updateTodo(id: number, title: string) {
    const existing = await this.prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.prisma.todo.update({
      where: { id },
      data: { title },
    });
  }

  async deleteTodo(id: number) {
    const existing = await this.prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.prisma.todo.delete({ where: { id } });
  }
}
