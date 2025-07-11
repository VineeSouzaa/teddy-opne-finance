# 🚀 Teddy Open Finance Challenge - URL Shortener API

> **Sistema de encurtamento de URLs com autenticação e análise de dados** 📊

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🏗️ Arquitetura](#️-arquitetura)
- [🔧 Funcionalidades](#-funcionalidades)
- [📊 Algoritmo de Encurtamento](#-algoritmo-de-encurtamento)
- [🚀 Como Executar](#-como-executar)
- [📚 Documentação da API](#-documentação-da-api)
- [🧪 Testes](#-testes)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🤝 Contribuição](#-contribuição)

## 🎯 Sobre o Projeto

Este projeto implementa um sistema completo de encurtamento de URLs com as seguintes características:

- **🔐 Autenticação JWT**: Sistema seguro de login e registro de usuários
- **🔗 Encurtamento Inteligente**: Algoritmo baseado em Base64 para compatibilidade universal
- **📈 Analytics**: Rastreamento de URLs duplicadas e métricas de acesso
- **🏛️ Arquitetura Hexagonal**: Código organizado e testável
- **🐳 Docker**: Containerização completa com PostgreSQL e PgAdmin

## 🛠️ Tecnologias Utilizadas

### Backend

- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Linguagem tipada para maior confiabilidade
- **TypeORM** - ORM para PostgreSQL
- **JWT** - Autenticação baseada em tokens
- **bcrypt** - Criptografia de senhas
- **class-validator** - Validação de dados

### Infraestrutura

- **PostgreSQL** - Banco de dados principal
- **Docker & Docker Compose** - Containerização
- **PgAdmin** - Interface de administração do banco

### Qualidade de Código

- **ESLint** - Linting com regras para arquitetura hexagonal
- **Prettier** - Formatação de código
- **Jest** - Framework de testes
- **Husky** - Git hooks
- **Commitizen** - Padronização de commits

## 🏗️ Arquitetura

O projeto segue a **Arquitetura Hexagonal (Clean Architecture)** com as seguintes camadas:

```
src/
├── 🎯 domain/          # Regras de negócio e entidades
├── 🔧 application/     # Casos de uso e serviços
├── 🏗️ infrastructure/ # Implementações externas (DB, JWT)
├── 🌐 presentation/    # Controllers e DTOs
└── 🔄 shared/          # Utilitários e constantes
```

### Princípios Aplicados

- **Inversão de Dependência**: Interfaces no domínio, implementações na infraestrutura
- **Separação de Responsabilidades**: Cada camada tem uma função específica
- **Testabilidade**: Código facilmente testável através de interfaces
- **Manutenibilidade**: Estrutura clara e organizada

## 🔧 Funcionalidades

### 👤 Gestão de Usuários

- ✅ Cadastro de usuários com validação
- ✅ Login com JWT (expiração: 2 minutos)
- ✅ Validação de senhas com bcrypt
- ✅ Perfil de usuário autenticado

### 🔗 Encurtamento de URLs

- ✅ Encurtamento para usuários logados
- ✅ Retorno da URL original para usuários não autenticados
- ✅ Armazenamento seguro no banco de dados
- ✅ Validação de URLs

### 📊 Analytics e Gestão

- ✅ Identificação de URLs duplicadas
- ✅ Ordenação por quantidade de acessos
- ✅ Soft delete para URLs inativas
- ✅ Rastreamento de criação e atualização

## 📊 Algoritmo de Encurtamento

### 🧮 Lógica Matemática

O sistema utiliza um algoritmo baseado em **Base64** com as seguintes características:

```
Caracteres disponíveis: A-Z, a-z, 0-9, -, _
Total de caracteres: 64
Comprimento do código: 6 caracteres
Combinações possíveis: 64^6 = 68.719.476.736 URLs únicas
```

### 🎯 Vantagens do Algoritmo

- **🌐 Compatibilidade Universal**: Evita caracteres reservados (`#`, `?`, `&`, `/`, `@`)
- **📱 Seguro para Navegadores**: Funciona em todos os dispositivos
- **⚡ Performance**: Geração rápida e eficiente
- **🔢 Escalabilidade**: Suporte a bilhões de URLs únicas

### 🔄 Fluxo de Funcionamento

1. **Usuário Logado**: URL é encurtada e armazenada no banco
2. **Usuário Não Logado**: Sistema retorna tanto a URL original quanto a encurtada
3. **Duplicatas**: Sistema identifica URLs repetidas para gestão
4. **Analytics**: Rastreamento de acessos para otimização

## 🚀 Como Executar

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

### 🐳 Execução com Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone <repository-url>
cd teddy-open-finance-challenge

# 2. Inicie os containers
docker-compose up -d

# 3. Instale as dependências
npm install

# 4. Execute a aplicação
npm run start:dev
```

### 🔧 Execução Local

```bash
# 1. Configure as variáveis de ambiente
cp .env.example .env

# 2. Instale as dependências
npm install

# 3. Execute os testes
npm run test

# 4. Inicie em modo desenvolvimento
npm run start:dev
```

### 🌐 Acessos

- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api
- **PgAdmin**: http://localhost:5050
  - Email: `admin@teddy.com`
  - Senha: `admin123`

## 📚 Documentação da API

### 🔐 Autenticação

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### 👤 Usuários

```http
POST /user
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "SecurePass123!"
}
```

### 🔗 Encurtamento de URLs

```http
POST /url-parser
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "url": "https://www.example.com/very-long-url"
}
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes end-to-end
npm run test:e2e
```

## 📁 Estrutura do Projeto

```
teddy-open-finance-challenge/
├── 📄 README.md                 # Documentação principal
├── 📦 package.json             # Dependências e scripts
├── 🐳 docker-compose.yml       # Configuração Docker
├── 📁 src/
│   ├── 🎯 domain/              # Regras de negócio
│   │   ├── entities/           # Entidades do domínio
│   │   └── ports/              # Interfaces dos repositórios
│   ├── 🔧 application/         # Casos de uso
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── services/          # Serviços de aplicação
│   │   └── use-cases/         # Casos de uso específicos
│   ├── 🏗️ infrastructure/     # Implementações externas
│   │   ├── database/          # Configuração do banco
│   │   ├── entity/            # Entidades do TypeORM
│   │   ├── guards/            # Guards de autenticação
│   │   └── repositories/      # Implementações dos repositórios
│   ├── 🌐 presentation/       # Camada de apresentação
│   │   ├── controllers/       # Controllers da API
│   │   ├── decorators/        # Decorators customizados
│   │   ├── dto/              # DTOs de entrada
│   │   └── services/         # Serviços de apresentação
│   ├── 🔄 shared/            # Utilitários compartilhados
│   │   └── utils/            # Utilitários e constantes
│   └── 📁 modules/           # Módulos da aplicação
├── 🧪 test/                  # Testes end-to-end
└── 📄 arquivos de configuração
```

## 🤝 Contribuição

### 📝 Padrões de Commit

O projeto utiliza **Conventional Commits**:

```bash
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração
test: adiciona testes
chore: tarefas de manutenção
```

### 🔧 Scripts Disponíveis

```bash
npm run build          # Build da aplicação
npm run start          # Inicia em produção
npm run start:dev      # Inicia em desenvolvimento
npm run lint           # Executa ESLint
npm run format         # Formata código com Prettier
npm run test           # Executa testes
npm run test:cov       # Testes com cobertura
```

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma **issue** no repositório ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para o Teddy Open Finance Challenge**
