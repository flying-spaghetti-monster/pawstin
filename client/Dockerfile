# client/Dockerfile
FROM node:22-alpine

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /app && chown -R node:node /app

# setting working directory in the container
WORKDIR /app

# grant permission of node project directory to node user
COPY . .

# installing the dependencies into the container
RUN npm install

# container exposed network port number
EXPOSE 5173

CMD ["npm run", "dev"]