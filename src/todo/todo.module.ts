import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthModule } from '../auth/auth.module';
import { TodoIdStrategy } from './todoId.strategy';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TodoController],
  providers: [TodoService, TodoIdStrategy],
})
export class TodoModule {}
