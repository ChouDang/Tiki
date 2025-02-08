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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const restaurants_service_1 = require("./restaurants.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantsService, cacheManager) {
        this.restaurantsService = restaurantsService;
        this.cacheManager = cacheManager;
    }
    async create(createRestaurantDto, img) {
        try {
            let result = this.restaurantsService.create({
                ...createRestaurantDto,
                img: img ? img.path : null,
            });
            if (result) {
                await this.delCache("restaurants_findAll");
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            let checkCache = await this.getCache("restaurants_findAll");
            if (checkCache) {
                return checkCache;
            }
            let result = this.restaurantsService.findAll();
            if (result) {
                await this.setCache("restaurants_findAll", result);
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        try {
            return this.restaurantsService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRestaurantsOfCategories(body) {
        try {
            const { categorie, page, size, query } = body || {};
            let result = this.restaurantsService.getRestaurantsOfCategories(categorie, +page, +size, query);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delRestaurants(id) {
        try {
            let result = await this.restaurantsService.delRestaurants(id);
            if (result) {
                await this.delCache("restaurants_findAll");
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async setCache(key, value, ttl = 10000) {
        await this.cacheManager.set(key, value, ttl);
    }
    async getCache(key) {
        return await this.cacheManager.get(key);
    }
    async delCache(key) {
        await this.cacheManager.del(key);
    }
    async resetCache() {
        await this.cacheManager.reset();
    }
};
exports.RestaurantsController = RestaurantsController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/img',
            filename: (req, file, callback) => callback(null, new Date() + "_" + file.originalname)
        }),
    })),
    (0, microservices_1.MessagePattern)("restaurants_create"),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)("restaurants_findAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)("restaurants_findOne"),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)("categories_foods"),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getRestaurantsOfCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)("delRestaurants"),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "delRestaurants", null);
exports.RestaurantsController = RestaurantsController = __decorate([
    (0, common_1.Controller)('restaurants'),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService, Object])
], RestaurantsController);
//# sourceMappingURL=restaurants.controller.js.map