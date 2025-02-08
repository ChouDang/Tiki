import { FoodsService } from './foods.service';
export declare class FoodsController {
    private readonly foodsService;
    constructor(foodsService: FoodsService);
    addFoodToRestaurant(addFoodsToRestaurantDto: any, img: Express.Multer.File): Promise<{
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
