"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.PRODUCT_QUEUE,
            queueOptions: {
                durable: true
            },
            persistent: true
        }
    });
    const apphttp = await core_1.NestFactory.create(app_module_1.AppModule);
    apphttp.use(express.static("."));
    await app.listen();
    await apphttp.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map