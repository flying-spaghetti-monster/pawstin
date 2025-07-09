# server/Dockerfile
FROM node:22-alpine

# create user in the docker image
USER node

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /app && chown -R node:node /app

# setting working directory in the container
WORKDIR /app

# grant permission of node project directory to node user
COPY --chown=node:node . .

# installing the dependencies into the container
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]