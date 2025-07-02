# server/Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
# RUN yarn prisma generate
# RUN yarn prisma db seed
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]