import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    signUp(body: Omit<users, 'id'>): Promise<{
        success: boolean;
        user: {
            id: string;
            firstname: string;
            lastname: string;
            username: string;
            phonenumber: string;
            email: string;
            password: string;
        };
    }>;
    login(body: Pick<users, 'email' | 'password'>): Promise<{
        success: boolean;
        user: {
            id: string;
            firstname: string;
            lastname: string;
            username: string;
            phonenumber: string;
            email: string;
            password: string;
        };
        token: string;
    }>;
    hashPass(pass: string): string;
}
