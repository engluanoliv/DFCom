# 🛒 Product Review App – Full Stack Challenge

This project was developed as part of the **DFcom Sistemas Technical Challenge**.  
It provides a full stack application for **managing products** and their **reviews**.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- REST API with CRUD endpoints for **Products** and **Reviews**
- Aggregation pipeline to calculate the **average rating** of a product

### Frontend
- **React 18** with **TypeScript**
- **Vite** (chosen for simplicity and speed in this challenge)
- **React Router** for navigation
- **Axios** for API communication
- Componentized interface for products and reviews management

> 💡 Note: I chose **Vite** for the frontend since the challenge requires React with Hooks.  
In a real-world SaaS application, I could also use **Next.js** to handle SSR/SEO and API routes in the same codebase.

### Bonus
- **Docker Compose** setup with:
  - MongoDB
  - Backend
  - Frontend

---

## 📦 Features

### Products
- Create a new product
- List all products
- Update a product
- Delete a product

### Reviews
- Create a new review for a product
- List all reviews of a specific product
- Update a review
- Delete a review
---

## 📂 Project Structure


├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── vite.config.ts
│
└── docker-compose.yml

---

## 🖥 Running locally

### Prerequisites
- Node.js >= 18
- Docker (optional, for containerized setup)
- MongoDB (if running without Docker)

### 1. Clone the repository
git clone https://github.com/<your-username>/product-review-app.git
cd product-review-app

### 2. Run backend
cd backend
npm install
npm run dev

Backend will run at: **http://localhost:5000**

### 3. Run frontend
cd frontend
npm install
npm run dev

Frontend will run at: **http://localhost:5173**

---

## 🐳 Docker Setup (bonus)

To run the whole stack with one command:
docker-compose up --build

- Frontend → http://localhost:5173  
- Backend → http://localhost:5000  
- MongoDB → mongodb://mongo:27017

---

## ✅ Challenge Requirements Covered
- [x] CRUD for Products
- [x] CRUD for Reviews
- [x] Relationship between Product ↔ Reviews
- [x] Endpoint to calculate product average rating
- [x] React frontend with Hooks and componentization
- [x] Organized project structure
- [x] Docker Compose for full stack setup (bonus)

---

## 📤 Delivery
The project code is hosted in this public GitHub repository.  
To run locally, follow the instructions above.
