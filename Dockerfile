# ==========================================
# STAGE 1: Build static assets
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy full application code
COPY . .

# Install dependencies cleanly
RUN npm ci

# Run type checks and build production assets
RUN npm run build

# ==========================================
# STAGE 2: Serve using Nginx
# ==========================================
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for Cloud Run compatibility (Port 8080 & SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for Google Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
