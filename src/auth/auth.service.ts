import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) {}

    async signup(signupDto: SignupDto) {
        const { email, password } = signupDto;
        const hashedPassword = await bcrypt.hash(password, 10);


        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        if (!user) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const payload = { id: user.id, email: user.email };
        const token = this.jwt.sign(payload);

        return {token, message: 'User created successfully' };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }

        const payload = { id: user.id, email: user.email };
        const token = this.jwt.sign(payload);

        return {token, message: 'Login successful' };
    }
}
