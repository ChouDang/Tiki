import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: Omit<users, 'id'>): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        phonenumber: string;
        email: string;
        password: string;
    }>;
    findAll(): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        phonenumber: string;
        email: string;
        password: string;
    }[]>;
    findByEmail(email: string): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        phonenumber: string;
        email: string;
        password: string;
    }>;
    update(id: string, updateUserDto: Omit<users, 'id'>): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        phonenumber: string;
        email: string;
        password: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        phonenumber: string;
        email: string;
        password: string;
    }>;
}
