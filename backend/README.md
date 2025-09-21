# Backend API

## Visão Geral

Este backend foi desenvolvido com **Node.js**, **Express** e **MongoDB
(Mongoose)**.\
Ele gerencia **Produtos** e **Avaliações** com os devidos relacionamentos.

## Estrutura do Projeto

```
src/
 ├── controllers/       # Camada HTTP (req, res)
 │    ├── productController.js
 │    └── reviewController.js
 ├── services/          # Lógica de negócio e operações no banco
 │    ├── productService.js
 │    └── reviewService.js
 ├── models/            # Schemas do Mongoose
 │    ├── Product.js
 │    └── Review.js
 ├── routes/            # Rotas do Express
 │    ├── productRoutes.js
 │    └── reviewRoutes.js
 ├── lib/               # Utilitários
 │    └── db.js
 └── server.js          # Ponto de entrada
```

## Funcionalidades

- CRUD para **Produtos**
- CRUD para **Avaliações**
- Relacionamento no MongoDB: cada Avaliação referencia um Produto
- Arquitetura organizada: Controller → Service → Model

## Configuração

```bash
# Instalar dependências
pnpm install
# ou
npm install
# ou
yarn install


# Rodar servidor
pnpm run dev
# ou
npm run dev
# ou
yarn run dev
```

## Endpoints da API

### Produtos

- `POST /api/products` → Criar produto
- `GET /api/products` → Listar produtos
- `GET /api/products/:productId` → Obter produto por ID
- `PUT /api/products/:productId` → Atualizar produto
- `DELETE /api/products/:productId` → Deletar produto (e suas avaliações)
- `GET /api/products/:productId/reviews` → Listar avaliações de um produto
- `POST /api/products/:productId/reviews` → Criar avaliação para um produto

### Avaliações

- `PUT /api/reviews/:reviewId` → Atualizar avaliação
- `DELETE /api/reviews/:reviewId` → Deletar avaliação

## Testes

Utilize ferramentas como **Postman** ou **Insomnia** para testar os endpoints.

## Docker

Você pode rodar com Docker:

```bash
docker build -t backend-api .
docker run -p 5500:5500 backend-api
```
