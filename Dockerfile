# Build stage: usa node alpine para build + dependências dev
FROM node:22.17.0-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (dev + prod)
RUN npm ci

# Copia código fonte
COPY . .

# Build da aplicação (ex: transpilar TS)
RUN npm run build

# Production stage: usa imagem distroless Node.js (muito menor e mais segura)
FROM gcr.io/distroless/nodejs:22

WORKDIR /app

# Cria usuário não root (opcional, depende da imagem distroless)
USER nonroot:nonroot

# Copia só o build da aplicação e arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ormconfig.js ./

# Instala só dependências de produção (em production stage)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production --prefix /app

# Expõe a porta da aplicação
EXPOSE 3000

# Healthcheck para monitoramento
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Comando padrão para rodar aplicação
CMD ["dist/main"]
