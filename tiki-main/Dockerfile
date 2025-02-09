FROM node:20

WORKDIR /root/fe-tiki

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 600000

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

# docker build . -t fe-tiki
# docker run -d -p 3000:3000 --name fe-tiki --net node-network fe-tiki