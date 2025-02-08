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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const login_dto_1 = require("./dto/login.dto");
const rxjs_1 = require("rxjs");
const update_user_dto_1 = require("./dto/update-user.dto");
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
const add_food_dto_1 = require("./dto/add-food.dto");
const passport_1 = require("@nestjs/passport");
const create_payment_dto_1 = require("./dto/create-payment.dto");
let AppController = class AppController {
    constructor(appService, identifyService, notificationService, paymentService, productService) {
        this.appService = appService;
        this.identifyService = identifyService;
        this.notificationService = notificationService;
        this.paymentService = paymentService;
        this.productService = productService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async signUp(body) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.identifyService.send("sign_up", body));
        }
        catch (error) {
            throw new common_1.HttpException("Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.identifyService.send("login", body));
        }
        catch (error) {
            throw new common_1.HttpException("Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.identifyService.send("users_findAll", ''));
        }
        catch (error) {
            throw new common_1.HttpException("Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateUserDto) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.identifyService.send("users_update", {
                id, updateUserDto
            }));
        }
        catch (error) {
            throw new common_1.HttpException("Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.identifyService.send("users_del", id));
        }
        catch (error) {
            throw new common_1.HttpException("Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllCategories() {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("categories_findAllCategories", ""));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCategorie(body) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("categories_createCategorie", body.name));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delCategorie(id) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("categories_delCategorie", id));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createRestaurantDto) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("restaurants_create", createRestaurantDto));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restaurantsFindAll() {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("restaurants_findAll", ""));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restaurantsFindOne(id) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("restaurants_findOne", id));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRestaurantsOfCategories(categorie, page = "1", size = "9", query) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("categories_foods", {
                categorie,
                page: +page,
                size: +size,
                query
            }));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delRestaurants(id) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("delRestaurants", id));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addFoodToRestaurant(addFoodsToRestaurantDto) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("addFoodToRestaurant", addFoodsToRestaurantDto));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllFoods() {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("foods_get", ''));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delFoods(id) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.productService.send("foods_del", id));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createOrders(createPaymentDto) {
        try {
            let result = await (0, rxjs_1.lastValueFrom)(this.paymentService.send("payment_createOrders", createPaymentDto));
            if (result) {
            }
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllOrder() {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.paymentService.send("payment_getAllOrder", ''));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOrderDetail(id) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.paymentService.send("payment_getOrderDetail", id));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delOrder(id) {
        try {
            return await (0, rxjs_1.lastValueFrom)(this.paymentService.send("payment_delOrder", id));
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, swagger_1.ApiTags)("App"),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Post)("auth/sign-up"),
    (0, swagger_1.ApiOperation)({ summary: 'dang ky' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Post)("auth/login"),
    (0, swagger_1.ApiOperation)({ summary: 'dang nhap' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiTags)("User"),
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'get all user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiTags)("User"),
    (0, swagger_1.ApiOperation)({ summary: 'sua user' }),
    (0, common_1.Patch)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiTags)("User"),
    (0, common_1.Delete)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'del user' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiTags)("Categories"),
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAllCategories", null);
__decorate([
    (0, swagger_1.ApiTags)("Categories"),
    (0, common_1.Post)("categories"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createCategorie", null);
__decorate([
    (0, swagger_1.ApiTags)("Categories"),
    (0, common_1.Delete)("categories"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delCategorie", null);
__decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, swagger_1.ApiOperation)({ summary: 'Tao cua hang' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Yêu cầu không hợp lệ.' }),
    (0, common_1.Post)("restaurants"),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, swagger_1.ApiOperation)({ summary: 'Lay ds cua hang' }),
    (0, common_1.Get)('restaurants'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "restaurantsFindAll", null);
__decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, swagger_1.ApiOperation)({ summary: 'Chi tiet cua hang' }),
    (0, common_1.Get)('restaurants/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "restaurantsFindOne", null);
__decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, swagger_1.ApiOperation)({ summary: 'Lay ds cua hang (phan trang) theo danh muc' }),
    (0, common_1.Get)("restaurants/categories/foods"),
    __param(0, (0, common_1.Query)("categorie")),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("size")),
    __param(3, (0, common_1.Query)("query")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getRestaurantsOfCategories", null);
__decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, swagger_1.ApiOperation)({ summary: 'del Restaurants' }),
    (0, common_1.Delete)("/categories/foods"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delRestaurants", null);
__decorate([
    (0, swagger_1.ApiTags)('Foods'),
    (0, swagger_1.ApiOperation)({ summary: 'Them food vao restaurant' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Post)("foods"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_food_dto_1.AddFoodDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addFoodToRestaurant", null);
__decorate([
    (0, swagger_1.ApiTags)('Foods'),
    (0, common_1.Get)('foods'),
    (0, swagger_1.ApiOperation)({ summary: "Get all foods" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllFoods", null);
__decorate([
    (0, swagger_1.ApiTags)('Foods'),
    (0, common_1.Delete)("foods"),
    (0, swagger_1.ApiOperation)({ summary: "del foods" }),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delFoods", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'Tao don hang' }),
    (0, common_1.Post)('payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createOrders", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'tat ca don hang' }),
    (0, common_1.Get)("payment/order"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllOrder", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'chi tiet don hang' }),
    (0, common_1.Get)("payment/orderDetail"),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getOrderDetail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'del don hang' }),
    (0, common_1.Delete)("payment/order"),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delOrder", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('IDENTITY_NAME')),
    __param(2, (0, common_1.Inject)('NOTIFICATION_NAME')),
    __param(3, (0, common_1.Inject)('PAYMENT_NAME')),
    __param(4, (0, common_1.Inject)('PRODUCT_NAME')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AppController);
//# sourceMappingURL=app.controller.js.map