FROM node:22-alpine AS builder
WORKDIR /app

# Install LibreOffice for PPTX to PDF conversion
RUN apk add --no-cache \
    libreoffice \
    openjdk11-jre \
    ttf-dejavu \
    fontconfig

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.3 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --prod

# Copy source code
COPY . .

# Ensure PDF.js worker is available from public/
RUN cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs || true

# Build application
RUN pnpm run build

# Production image
FROM node:22-alpine
WORKDIR /app

# Install LibreOffice for PPTX to PDF conversion
RUN apk add --no-cache \
    libreoffice \
    openjdk11-jre \
    ttf-dejavu \
    fontconfig

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.3 --activate

# Copy built application
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next  
COPY --from=builder /app/public ./public  

EXPOSE 3000

CMD ["pnpm", "start"]
