FROM node:20

# WORKDIR /root/payment-service
WORKDIR /home/ubuntu/Tiki/be-tiki/payment-service

COPY package.json .
   
RUN yarn config set network-timeout 3000000
RUN yarn install

COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN yarn prisma generate

COPY . .

RUN yarn run build

CMD ["yarn","start:prod"]