import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException({
        message: 'Refresh token invalid or expired',
        error: 'UNAUTHORIZED',
        statusCode: 401,
      });
    }
    return user;
  }
}