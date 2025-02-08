declare class OrderItemDto {
    foodId: string;
    quantity: number;
}
export declare class CreatePaymentDto {
    userId: string;
    items: OrderItemDto[];
}
export {};
