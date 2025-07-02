# server/Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install
RUN yarn prisma generate

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]