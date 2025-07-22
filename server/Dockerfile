# server/Dockerfile
FROM node:22-alpine

# Create app directory as root
RUN mkdir -p /app && chown -R node:node /app

# Set working directory
WORKDIR /app

# Copy files and set correct ownership
COPY --chown=node:node . .

# Install dependencies and build the app
RUN npm install && npm run build

RUN npx prisma db push

EXPOSE 3000

CMD ["npm run", "start"]