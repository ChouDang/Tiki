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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const categories_service_1 = require("./categories.service");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    findAllCategories() {
        try {
            return this.categoriesService.findAllCategories();
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    createCategorie(name) {
        try {
            return this.categoriesService.createCategorie(name);
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    delCategorie(id) {
        try {
            return this.categoriesService.delCategorie(id);
        }
        catch (error) {
            throw new common_1.HttpException("Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, microservices_1.MessagePattern)("categories_findAllCategories"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAllCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)("categories_createCategorie"),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createCategorie", null);
__decorate([
    (0, microservices_1.MessagePattern)("categories_delCategorie"),
    __param(0, (0, microservices_1.Payload)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "delCategorie", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map