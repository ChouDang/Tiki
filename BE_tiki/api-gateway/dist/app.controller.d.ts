import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { AddFoodDto } from './dto/add-food.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class AppController {
    private readonly appService;
    private identifyService;
    private notificationService;
    private paymentService;
    private productService;
    constructor(appService: AppService, identifyService: ClientProxy, notificationService: ClientProxy, paymentService: ClientProxy, productService: ClientProxy);
    getHello(): string;
    signUp(body: SignUpDto): Promise<any>;
    login(body: LoginDto): Promise<any>;
    findAll(): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<any>;
    findAllCategories(): Promise<any>;
    createCategorie(body: {
        name: string;
    }): Promise<any>;
    delCategorie(id: string): Promise<any>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<any>;
    restaurantsFindAll(): Promise<any>;
    restaurantsFindOne(id: string): Promise<any>;
    getRestaurantsOfCategories(categorie: string, page: string, size: string, query: string): Promise<any>;
    delRestaurants(id: string): Promise<any>;
    addFoodToRestaurant(addFoodsToRestaurantDto: AddFoodDto): Promise<any>;
    getAllFoods(): Promise<any>;
    delFoods(id: string): Promise<any>;
    createOrders(createPaymentDto: CreatePaymentDto): Promise<any>;
    getAllOrder(): Promise<any>;
    getOrderDetail(id: string): Promise<any>;
    delOrder(id: string): Promise<any>;
}
