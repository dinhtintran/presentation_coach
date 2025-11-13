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

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Ensure PDF.js worker is available from public/
RUN cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs || true

EXPOSE 3000

# Run database migrations
RUN pnpm exec drizzle-kit push:pg

CMD ["pnpm", "run", "dev"]
