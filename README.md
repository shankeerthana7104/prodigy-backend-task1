# Prodigy Infotech Backend Internship

## 📌 Task 1: Basic REST API

This project implements a simple REST API that performs CRUD operations for managing users.

### 🔧 Technologies Used
- Node.js
- Express.js
- UUID
- Postman

### 📬 API Endpoints
- POST /users → Create user
- GET /users → Get all users
- GET /users/:id → Get single user
- PUT /users/:id → Update user
- DELETE /users/:id → Delete user

---

## 📌 Task 2: Persistent Storage with Database Integration

Extended the REST API to use MongoDB for persistent storage.

### 🚀 Features
- MongoDB database integration
- Mongoose ODM used for schema modeling
- Environment variables using dotenv
- CRUD operations with database
- Tested using Postman

### 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

### 📂 Project Structure
config/
models/
routes/
server.js
.env

### 📬 API Endpoints
- POST /api/users → Create user
- GET /api/users → Get all users
- GET /api/users/:id → Get single user
- PUT /api/users/:id → Update user
- DELETE /api/users/:id → Delete user

---

## ▶️ How to Run

1. Install dependencies  
2. start server 
3. test the API using 


## Task 3 - Authentication & Authorization

- Implemented JWT-based authentication
- Added user registration & login
- Used bcrypt for password hashing
- Protected routes using middleware
- Role-based access control (Admin/User)