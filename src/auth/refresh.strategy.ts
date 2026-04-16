import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET as string,
          passReqToCallback: true,
        });
      }
    
      async validate(req: any, payload: any) {
        const refreshToken = req.headers['authorization']?.split(' ')[1];
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }
        return {
            ...payload,
            refreshToken: refreshToken,
        };
      }
}