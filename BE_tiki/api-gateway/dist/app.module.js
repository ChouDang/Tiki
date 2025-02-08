"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const jwt_stragery_1 = require("./stratery/jwt.stragery");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: process.env.IDENTITY_NAME,
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.get('RABBITMQ_URL')],
                            queue: configService.get('IDENTITY_QUEUE'),
                            queueOptions: {
                                durable: true,
                            },
                            persistent: true,
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
                {
                    name: process.env.NOTIFICATION_NAME,
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.get('RABBITMQ_URL')],
                            queue: configService.get('NOTIFICATION_QUEUE'),
                            queueOptions: {
                                durable: true,
                            },
                            persistent: true,
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
                {
                    name: process.env.PAYMENT_NAME,
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.get('RABBITMQ_URL')],
                            queue: configService.get('PAYMENT_QUEUE'),
                            queueOptions: {
                                durable: true,
                            },
                            persistent: true,
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
                {
                    name: process.env.PRODUCT_NAME,
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.get('RABBITMQ_URL')],
                            queue: configService.get('PRODUCT_QUEUE'),
                            queueOptions: {
                                durable: true,
                            },
                            persistent: true,
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ])
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_stragery_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map