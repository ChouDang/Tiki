import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: any): Promise<{
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
    login(body: any): Promise<{
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
}
