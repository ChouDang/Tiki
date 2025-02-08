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
exports.FoodsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const foods_service_1 = require("./foods.service");
let FoodsController = class FoodsController {
    constructor(foodsService) {
        this.foodsService = foodsService;
    }
    addFoodToRestaurant(addFoodsToRestaurantDto, img) {
        try {
            return this.foodsService.addFoodsToRestaurant(addFoodsToRestaurantDto, img);
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getAllFoods() {
        try {
            return this.foodsService.getAllFoods();
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    delFoods(id) {
        try {
            return this.foodsService.delFoods(id);
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FoodsController = FoodsController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/img',
            filename: (req, file, callback) => callback(null, new Date().toISOString() + "_" + file.originalname)
        }),
    })),
    (0, microservices_1.MessagePattern)("addFoodToRestaurant"),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FoodsController.prototype, "addFoodToRestaurant", null);
__decorate([
    (0, microservices_1.MessagePattern)("foods_get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FoodsController.prototype, "getAllFoods", null);
__decorate([
    (0, microservices_1.MessagePattern)("foods_del"),
    __param(0, (0, microservices_1.Payload)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FoodsController.prototype, "delFoods", null);
exports.FoodsController = FoodsController = __decorate([
    (0, common_1.Controller)('foods'),
    __metadata("design:paramtypes", [foods_service_1.FoodsService])
], FoodsController);
//# sourceMappingURL=foods.controller.js.map