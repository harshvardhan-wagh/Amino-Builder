FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Optional: avoid host checking (Vite binds to 0.0.0.0)
ENV HOST=0.0.0.0
CMD ["npm", "run", "dev"]
