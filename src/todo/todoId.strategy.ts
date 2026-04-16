import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TodoIdStrategy {
    validate(todoId: any) {
        if (!todoId) {
          throw new BadRequestException('Todo id is required');
        }
    
        return true;
      }
}