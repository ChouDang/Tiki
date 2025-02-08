import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrders(createPaymentDto: {
        userId: string;
        items: {
            foodId: string;
            quantity: number;
        }[];
    }): Promise<{
        message: string;
        order: {
            order_food: {
                quantity: number;
                food_id: string;
                order_id: string;
            }[];
        } & {
            id: string;
            user_id: string | null;
            total_price: import("@prisma/client/runtime/library").Decimal;
            order_date: Date;
        };
    }>;
    getAllOrder(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        user_id: string | null;
        total_price: import("@prisma/client/runtime/library").Decimal;
        order_date: Date;
    }[]>;
    getOrderDetail(id: string): import(".prisma/client").Prisma.Prisma__ordersClient<{
        order_food: ({
            foods: {
                id: string;
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                img: string | null;
                stock: number;
                restaurant_id: string | null;
                category_id: string | null;
            };
        } & {
            quantity: number;
            food_id: string;
            order_id: string;
        })[];
        users: {
            id: string;
            firstname: string;
            lastname: string;
            username: string;
            phonenumber: string;
            email: string;
            password: string;
        };
    } & {
        id: string;
        user_id: string | null;
        total_price: import("@prisma/client/runtime/library").Decimal;
        order_date: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    delOrder(id: string): import(".prisma/client").Prisma.Prisma__ordersClient<{
        id: string;
        user_id: string | null;
        total_price: import("@prisma/client/runtime/library").Decimal;
        order_date: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
