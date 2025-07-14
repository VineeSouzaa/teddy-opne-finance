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

FROM node:22.17.0 AS production

WORKDIR /app

# Instala dependências de produção
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copia só o build da aplicação e arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/ormconfig.js ./

# Cria usuário não root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

# Expõe a porta da aplicação
EXPOSE 3000

# Healthcheck para monitoramento
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Comando padrão para rodar aplicação
CMD ["dist/main"]
