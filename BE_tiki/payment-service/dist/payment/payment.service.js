"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentService = class PaymentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrders(createPaymentDto) {
        const { userId, items } = createPaymentDto;
        return this.prisma.$transaction(async (prisma) => {
            let foods = [];
            for (const item of items) {
                const food = await prisma.foods.findUnique({
                    where: { id: item.foodId },
                });
                if (!food) {
                    throw new common_1.NotFoundException(`Food item with ID ${item.foodId} not found`);
                }
                if (food.stock < item.quantity) {
                    throw new common_1.BadRequestException(`Not enough stock for food item ${food.name}. Available stock: ${food.stock}, requested: ${item.quantity}`);
                }
                await prisma.foods.update({
                    where: { id: item.foodId },
                    data: {
                        stock: food.stock - item.quantity,
                    },
                });
                foods.push(food);
            }
            const totalPrice = items.reduce((total, item) => {
                const find_food = foods.find((foodItem) => foodItem.id === item.foodId);
                return total + (find_food ? +find_food.price : 0) * item.quantity;
            }, 0);
            const order = await prisma.orders.create({
                data: {
                    user_id: userId,
                    total_price: totalPrice,
                    order_food: {
                        create: items.map((item) => ({
                            food_id: item.foodId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    order_food: true,
                },
            });
            return {
                message: 'Order and delivery created successfully',
                order: order,
            };
        });
    }
    getAllOrder() {
        return this.prisma.orders.findMany();
    }
    getOrderDetail(id) {
        return this.prisma.orders.findUnique({
            where: { id },
            include: {
                order_food: {
                    include: {
                        foods: true
                    }
                },
                users: true
            }
        });
    }
    delOrder(id) {
        return this.prisma.orders.delete({
            where: { id }
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map