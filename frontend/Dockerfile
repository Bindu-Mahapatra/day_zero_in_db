# ---------- Build Stage ----------
FROM node:22 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application
COPY . .

# Build Angular
RUN npm run build

# ---------- Runtime Stage ----------
FROM nginx:alpine

# Copy built application
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]