import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException({
        message: 'Token invalid or expired',
        error: 'UNAUTHORIZED',
        statusCode: 401,
      });
    }
    return user;
  }
}