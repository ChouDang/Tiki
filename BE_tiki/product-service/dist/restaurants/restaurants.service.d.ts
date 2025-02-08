import { restaurants } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRestaurantDto: Omit<restaurants, "foods" | "id">): Promise<{
        name: string;
        id: string;
        address: string | null;
        img: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<{
        foods: ({
            categories: {
                name: string;
                id: string;
            };
        } & {
            name: string;
            id: string;
            img: string | null;
            description: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            restaurant_id: string | null;
            category_id: string | null;
        })[];
    } & {
        name: string;
        id: string;
        address: string | null;
        img: string;
    }>;
    getRestaurantsOfCategories(categorie: string, page: number, size: number, query: string): Promise<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        size: number;
        data: ({
            foods: {
                name: string;
                id: string;
                img: string | null;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                restaurant_id: string | null;
                category_id: string | null;
            }[];
        } & {
            name: string;
            id: string;
            address: string | null;
            img: string;
        })[];
    }>;
    delRestaurants(id: string): Promise<{
        name: string;
        id: string;
        address: string | null;
        img: string;
    }>;
}
