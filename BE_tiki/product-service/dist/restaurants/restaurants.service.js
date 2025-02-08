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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RestaurantsService = class RestaurantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRestaurantDto) {
        try {
            return this.prisma.restaurants.create({
                data: createRestaurantDto
            });
        }
        catch (error) {
            console.log(error, "error");
        }
    }
    async findAll() {
        return this.prisma.restaurants.findMany().catch(err => err);
    }
    async findOne(id) {
        try {
            return await this.prisma.restaurants.findUnique({
                where: { id },
                include: {
                    foods: {
                        include: {
                            categories: true
                        }
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getRestaurantsOfCategories(categorie, page, size, query) {
        const restaurants = await this.prisma.restaurants.findMany({
            skip: (page - 1) * size,
            take: size,
            where: {
                AND: [
                    {
                        foods: {
                            some: {
                                category_id: categorie
                            }
                        }
                    },
                    {
                        OR: [
                            { name: { contains: query, mode: "insensitive" } },
                            { foods: { some: { name: { contains: query, mode: "insensitive" } } } }
                        ]
                    }
                ]
            },
            include: {
                foods: true
            }
        });
        const totalCountAll = await this.prisma.restaurants.count();
        const totalCount = await this.prisma.restaurants.count({
            where: {
                AND: [
                    {
                        foods: {
                            some: {
                                category_id: categorie
                            }
                        }
                    },
                    {
                        OR: [
                            { name: { contains: query, mode: "insensitive" } },
                            { foods: { some: { name: { contains: query, mode: "insensitive" } } } }
                        ]
                    }
                ]
            },
        });
        return {
            totalCount,
            totalPages: Math.ceil(totalCountAll / size),
            currentPage: page,
            size,
            data: restaurants,
        };
    }
    async delRestaurants(id) {
        try {
            return this.prisma.restaurants.delete({
                where: { id }
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map