# ─────────────────────────────────────────────
# Stage 1: Build (Vite + PWA)
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy manifests first for better layer caching
COPY package*.json ./

# Install ALL dependencies (devDeps needed for the Vite/TS build)
RUN npm ci

# Copy source and build the production bundle into /app/dist
COPY . .
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Runtime (static files served by nginx)
# ─────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# SPA config as an nginx template: the official image runs envsubst on
# /etc/nginx/templates/*.template at startup, so ${PORT} is injected from
# the environment. Cloud Run sets PORT (default 8080) — we default it too.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the compiled static assets from the build stage
COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT=8080
EXPOSE 8080

# nginx:alpine entrypoint expands templates, then runs nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
