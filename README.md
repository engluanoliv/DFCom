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
> Em uma aplicação SaaS real, eu também poderia usar **Next.js** para lidar com SSR/SEO e rotas de API no mesmo código.

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
- `GET /api/products/:productId/average-rating` → Média de Avaliações do produto

### Avaliações

- `PUT /api/reviews/:reviewId` → Atualizar avaliação
- `DELETE /api/reviews/:reviewId` → Deletar avaliação

## Testes

Utilize ferramentas como **Postman** ou **Insomnia** para testar os endpoints.

---

## 🖥 Rodando Aplicação

### Pré-requisitos

- Node.js >= 18
- Docker (opcional, para rodar em containers)
- MongoDB (se rodar sem Docker)

### Clonar o repositório

```bash
git clone https://github.com/engluanoliv/DFCom.git
cd DFCom
```

### Criar o arquivo .env baseado no .env.sample
Copiar as variaveis de ambiente do arquivo .env.sample para um arquivo .env em ambos (frontens e backend)


Você pode rodar a aplicação de duas formas: usando **Docker Compose (recomendado)** ou rodando os serviços separadamente de forma local.

### Opção 1: Rodar com Docker Compose (Recomendado)

Essa é a forma mais simples, pois inicia o **backend**, o **frontend** e o **banco de dados** com um único comando.

Certifique-se de que o Docker esteja em execução.

No diretório raiz do projeto, execute:

```bash
docker-compose up --build
```

O backend e o frontend estarão rodando dentro de containers, e o MongoDB também.

- Frontend → [http://localhost:5173](http://localhost:5173)
- Backend → [http://localhost:5500](http://localhost:5500)
- MongoDB → `mongodb://mongo:27017`

---

### Opção 2: Rodar o Backend e o Frontend localmente

Use esta opção se preferir não usar Docker ou se quiser usar um banco de dados remoto (como o **MongoDB Atlas**).

#### A. Rodar o Backend

No diretório `backend`, instale as dependências e inicie o servidor:

```bash
cd backend
pnpm install
# ou npm install

pnpm run dev
# ou npm run dev
```

O backend estará disponível em: [http://localhost:5500](http://localhost:5500)

---

#### B. Rodar o Frontend

Em um novo terminal, no diretório `frontend`, instale as dependências e inicie o servidor:

```bash
cd frontend
pnpm install
# ou npm install

pnpm run dev
# ou npm run dev
```

O frontend estará disponível em: [http://localhost:5173](http://localhost:5173)

> 💡 Observação: É possível usar MongoDB Atlas como banco remoto em vez do Mongo local.
> Basta alterar a variável de ambiente MONGO_URI no backend para o URI do Atlas.

---

## 📤 Entrega

O código do projeto está hospedado neste repositório público no GitHub.  
Para rodar localmente, siga as instruções acima.
