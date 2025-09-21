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