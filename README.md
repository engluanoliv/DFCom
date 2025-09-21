# 🛒 Product Review App – Desafio Full Stack

Este projeto foi desenvolvido como parte do **Desafio Técnico da DFcom Sistemas**.  
Ele fornece uma aplicação full stack para **gerenciar produtos** e suas **avaliações**.

## 🚀 Tecnologias

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- API REST com endpoints CRUD para **Produtos** e **Reviews**
- Pipeline de agregação para calcular a **média de avaliações** de um produto


### Frontend
- **React 18** com **TypeScript**
- **Vite**
- **React Router** para navegação
- **Axios** para comunicação com a API
- Interface componentizada para gerenciamento de produtos e avaliações

> 💡 Observação: Escolhi **Vite** para o frontend, já que o desafio exige React com Hooks.  
Em uma aplicação SaaS real, eu também poderia usar **Next.js** para lidar com SSR/SEO e rotas de API no mesmo código.


### Bônus
- Configuração com **Docker Compose** incluindo:
  - MongoDB
  - Backend
  - Frontend

---

## 📦 Funcionalidades

### Produtos
- Criar um novo produto
- Listar todos os produtos
- Atualizar um produto
- Deletar um produto

### Avaliações (Reviews)
- Criar uma nova avaliação para um produto
- Listar todas as avaliações de um produto específico
- Atualizar uma avaliação
- Deletar uma avaliação

### Extra
- Obter a **média de avaliações** de um produto usando agregação do MongoDB

---

## 📂 Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── reviewController.js
│   ├── services/
│   │   ├── productService.js
│   │   └── reviewService.js
│   ├── models/
│   │   ├── Product.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── reviewRoutes.js
│   ├── lib/
│   │   └── db.js
│   └── server.js

frontend/
├── src/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── providers/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   └── utils/
├── index.html
└── vite.config.ts
docker-compose.yml
```
---

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

---

## 🖥 Rodando Localmente

### Pré-requisitos
- Node.js >= 18
- Docker (opcional, para rodar em containers)
- MongoDB (se rodar sem Docker)

### 1. Clonar o repositório
```bash
git clone https://github.com/<seu-usuario>/product-review-app.git
cd product-review-app
```

### 2. Rodar o backend
```bash
cd backend

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

O backend estará em: **http://localhost:5500**

### 3. Rodar o frontend
```bash
cd frontend
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

O frontend estará em: **http://localhost:5173**

---

## 🐳 Docker Setup

Para rodar toda a stack com um único comando:
```bash
docker-compose up --build
```

- Frontend → http://localhost:5173  
- Backend → http://localhost:5500  
- MongoDB → mongodb://mongo:27017

> 💡 Observação: É possível usar MongoDB Atlas como banco remoto em vez do Mongo local.
Basta alterar a variável de ambiente MONGO_URI no backend para o URI do Atlas.
Assim, o projeto funciona sem precisar rodar MongoDB localmente, facilitando para recrutadores ou colaboradores.


---

## 📤 Entrega
O código do projeto está hospedado neste repositório público no GitHub.  
Para rodar localmente, siga as instruções acima.