FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests first (improves Docker layer caching)
COPY package*.json ./

RUN npm install

# Copy all source files (server.js, etc.)
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
