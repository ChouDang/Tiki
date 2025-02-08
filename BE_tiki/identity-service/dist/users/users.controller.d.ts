import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        phonenumber: string;
        email: string;
        password: string;
    }[]>;
    update(body: any): Promise<{
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
