import { PrismaService } from 'src/prisma/prisma.service';
export declare class FoodsService {
    private prisma;
    constructor(prisma: PrismaService);
    addFoodsToRestaurant(food: any, img: Express.Multer.File): Promise<{
        name: string;
        id: string;
        img: string | null;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        restaurant_id: string | null;
        category_id: string | null;
    }>;
    getAllFoods(): Promise<{
        name: string;
        id: string;
        img: string | null;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        restaurant_id: string | null;
        category_id: string | null;
    }[]>;
    getFoodsById(id: string): Promise<{
        name: string;
        id: string;
        img: string | null;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        restaurant_id: string | null;
        category_id: string | null;
    }[]>;
    delFoods(id: string): Promise<{
        name: string;
        id: string;
        img: string | null;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        restaurant_id: string | null;
        category_id: string | null;
    }>;
}
