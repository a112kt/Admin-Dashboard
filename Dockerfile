# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:20.9-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/main#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package manifests and npm config first for optimal layer caching.
# Changes to source code won't invalidate the expensive npm install layer.
COPY package.json package-lock.json .npmrc ./

# Use `npm ci` for deterministic, reproducible installs from lock file.
# --legacy-peer-deps is inherited from .npmrc
RUN npm ci

# ============================================
# Stage 2: Build the application
# ============================================
FROM node:20.9-alpine AS builder

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application source code
COPY . .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
# Build the Next.js application
RUN npm run build

# ============================================
# Stage 3: Production runner (minimal image)
# ============================================
FROM node:20.9-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security best practices
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Leverage Next.js standalone output for minimal image size.
# The standalone folder contains the server and all required node_modules.
# See: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the default Next.js port
EXPOSE 3000

# Set hostname to listen on all interfaces inside the container
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Start the standalone Next.js server
CMD ["node", "server.js"]
