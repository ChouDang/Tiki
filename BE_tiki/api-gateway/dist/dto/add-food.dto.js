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
exports.AddFoodDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddFoodDto {
}
exports.AddFoodDto = AddFoodDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Tên món ăn' }),
    __metadata("design:type", String)
], AddFoodDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Mô tả về món ăn' }),
    __metadata("design:type", String)
], AddFoodDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Giá của món ăn' }),
    __metadata("design:type", Number)
], AddFoodDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Số lượng trong kho' }),
    __metadata("design:type", Number)
], AddFoodDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'ID của nhà hàng' }),
    __metadata("design:type", String)
], AddFoodDto.prototype, "restaurant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'ID của danh mục món ăn' }),
    __metadata("design:type", String)
], AddFoodDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'Ảnh món ăn' }),
    __metadata("design:type", Object)
], AddFoodDto.prototype, "img", void 0);
//# sourceMappingURL=add-food.dto.js.map