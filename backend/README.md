# Backend API

## Overview

This backend is built with **Node.js**, **Express**, and **MongoDB
(Mongoose)**.\
It manages **Products** and **Reviews** with proper relationships.

## Project Structure

    src/
     ├── controllers/       # Handle HTTP layer (req, res)
     │    ├── productController.js
     │    └── reviewController.js
     ├── services/          # Business logic & database operations
     │    ├── productService.js
     │    └── reviewService.js
     ├── models/            # Mongoose schemas
     │    ├── Product.js
     │    └── Review.js
     ├── routes/            # Express routes
     │    ├── productRoutes.js
     │    └── reviewRoutes.js
     ├── lib/               # Utility files
     │    └── db.js
     └── server.js          # Entry point

## Features

-   CRUD for **Products**
-   CRUD for **Reviews**
-   MongoDB relationships: each Review references a Product
-   Organized architecture: Controller → Service → Model

## Setup

``` bash
# Install dependencies
pnpm install

# Environment variables (.env)
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
PORT=5000

# Run server
pnpm dev
```

## API Endpoints

### Products

-   `POST /api/products` → Create product
-   `GET /api/products` → List products
-   `GET /api/products/:id` → Get single product
-   `PUT /api/products/:id` → Update product
-   `DELETE /api/products/:id` → Delete product (and its reviews)

### Reviews

-   `POST /api/reviews` → Create review
-   `GET /api/reviews` → List reviews
-   `GET /api/reviews/:id` → Get single review
-   `PUT /api/reviews/:id` → Update review
-   `DELETE /api/reviews/:id` → Delete review

## Testing

Use tools like **Postman** or **Insomnia** to test endpoints.

## Docker

You can run with Docker:

``` bash
docker build -t backend-api .
docker run -p 5500:5500 backend-api
```
