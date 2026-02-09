# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_PRODUCT_API_URL
ARG VITE_IMAGE_PROXY_URL

# Set environment variables from build arguments
ENV VITE_PRODUCT_API_URL=$VITE_PRODUCT_API_URL
ENV VITE_IMAGE_PROXY_URL=$VITE_IMAGE_PROXY_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
