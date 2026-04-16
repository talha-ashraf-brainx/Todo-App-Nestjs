import { Controller, ValidationPipe, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {SignupDto} from './dto/signup.dto';
import {LoginDto} from './dto/login.dto';
import { RefreshGuard } from './refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body(new ValidationPipe()) body: SignupDto) {
        return this.authService.signup(body);
    }

    @Post('login')
    login(@Body(new ValidationPipe()) body: LoginDto) {
        return this.authService.login(body);
    }

    @UseGuards(RefreshGuard)
    @Post('refresh')
    refresh(@Req() req: Request) {
        return this.authService.refresh(req);
    }
}
