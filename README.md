<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

API simples entidade User com autenticação JWT, RBAC e Swagger.

### User

É a entidade que representa um acesso

- **id:** CUID identificador único do usuário, gerado automaticamente pelo prisma.
- **name:** nome do usuário, opcional.
- **email:** email do usuário, deve ser único.
- **password:** senha do usuário, salva de forma encriptada no banco.
- **role:** role do usuário, valor default é `USER`. Um usuário `ADMIN` só pode ser criado pelo banco.
- **created_at:** Data e hora em que a entidade foi criada, com valor padrão de now().
- **updated_at:** Data e hora da última atualização da entidade, atualizado automaticamente.

# Documentação da API

## 1. Passos de Instalação

### 1.1 Clonar o Repositório

Clone o repositório da API utilizando o comando abaixo:

```bash
git clone https://github.com/matheushb/uc-api.git
```

Em seguida, entre no diretório do projeto:

```bash
cd nestjs-base-project
```

### 1.2 Instalar as Dependências

Instale as dependências necessárias executando:

```bash
npm install
```

### 1.3 Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:

```bash
cp .env.example .env
```

### 1.4 Inicializar o Docker

Certifique-se de que o Docker está em execução e então rode o comando para iniciar os containers:

```bash
docker-compose up -d
```

### 1.5 Migrar Banco de Dados

Para aplicar as migrações no banco de dados utilizando o Prisma, execute:

```bash
npx prisma migrate dev
```

## 2. Executar a API

Para iniciar a API utilize o comando:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 3. Executar os Testes

Com o Docker em execução, para rodar os testes, utilize o comando:

```bash
npm run test
```

## 4. Documentação Swagger

A documentação interativa da API, utilizando Swagger, está disponível na seguinte rota:

```bash
GET /api
```
