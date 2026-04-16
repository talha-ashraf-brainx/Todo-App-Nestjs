import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TodoIdStrategy } from './todoId.strategy';

@Injectable()
export class TodoIdGuard implements CanActivate {
    constructor(private readonly todoIdStrategy: TodoIdStrategy) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return this.todoIdStrategy.validate(request.params?.id);
    }
}