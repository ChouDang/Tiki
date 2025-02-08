import { RestaurantsService } from './restaurants.service';
import { Cache } from 'cache-manager';
export declare class RestaurantsController {
    private readonly restaurantsService;
    private cacheManager;
    constructor(restaurantsService: RestaurantsService, cacheManager: Cache);
    create(createRestaurantDto: any, img: Express.Multer.File): Promise<{
        id: string;
        name: string;
        address: string | null;
        img: string;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<{
        foods: ({
            categories: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            img: string | null;
            description: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            restaurant_id: string | null;
            category_id: string | null;
        })[];
    } & {
        id: string;
        name: string;
        address: string | null;
        img: string;
    }>;
    getRestaurantsOfCategories(body: any): Promise<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        size: number;
        data: ({
            foods: {
                id: string;
                name: string;
                img: string | null;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                restaurant_id: string | null;
                category_id: string | null;
            }[];
        } & {
            id: string;
            name: string;
            address: string | null;
            img: string;
        })[];
    }>;
    delRestaurants(id: string): Promise<{
        id: string;
        name: string;
        address: string | null;
        img: string;
    }>;
    setCache(key: string, value: any, ttl?: number): Promise<void>;
    getCache(key: string): Promise<any>;
    delCache(key: string): Promise<void>;
    resetCache(): Promise<void>;
}
