# 📖 Library NodeJS Service Documentation

## 📌 Overview

Library JS Service is a Node.js-based API designed for user authentication. It provides essential functionalities for user registration and login, ensuring secure access to applications.

## ⚙️ System Requirements

- **Node.js**
- **Database**: Oracle
- **Package Manager**: npm

## 📦 Dependencies

- **Express.js** → Web framework for handling HTTP requests
- **Sequelize** → ORM for database interactions
- **JWT** → Authentication management
- **bcryptjs** → Password hashing for security

## 🛠 Installation

To install the necessary dependencies, run:

```sh
npm install
```

## 🚀 Running the Application

Follow these steps to set up and run the application:

1. **Configure the database:** Update `config.json` with your database username, password.
2. **Run migrations and seed the database:**
   ```sh
   npx sequelize db:migrate   # Create the Users table
   npx sequelize db:seed:all  # Populate the Users table with 3 example records
   ```
3. **Start the application:**
   ```sh
   npm start   # Start the application
   npm run dev # Start with nodemon
   ```

## 🔑 API Endpoints

### 🔐 Authentication

#### 1️⃣ User Registration

**Endpoint:** `POST /v1/users/register`

**Request:**

```json
{
  "email": "riovaldy@gmail.com",
  "password": "YourPassword123",
  "name": "Riovaldy Wijaya",
  "phoneNumber": "08123456789",
  "role": "ADMIN"
}
```

**Validation Rules:**
- **Email** (required, must be unique, must be a valid format)
- **Password** (required, alphanumeric, minimum 8 characters, must contain at least 1 uppercase letter)
- **Name** (required)
- **PhoneNumber** (optional)
- **Role** (optional, default: "USER", must be "ADMIN" or "USER")

**Response:**

```json
{
  "email": "riovaldy@gmail.com",
  "name": "Riovaldy Wijaya",
  "role": "ADMIN"
}
```

**Error Responses:**

```json
{
  "message": "Email is required"
}
```

```json
{
  "message": "Password is required"
}
```

```json
{
  "message": "Password must be at least 8 characters long and contain at least one uppercase letter"
}
```

```json
{
  "message": "Name is required"
}
```

```json
{
  "message": "Email is already registered"
}
```

#### 2️⃣ User Login

**Endpoint:** `POST /v1/users/login`

**Request:**

```json
{
  "email": "riovaldy@gmail.com",
  "password": "YourPassword123"
}
```

**Validation Rules:**
- **Email** (required)
- **Password** (required)

**Response:**

```json
{
  "access_token": "eyJhbGciOiI6IkpXVCJ9.eyJpZCI6IlUwMDMiLCJlb.WFpbCI6InVzZXI"
}
```

**Error Responses:**

```json
{
  "message": "Email is required"
}
```

```json
{
  "message": "Password is required"
}
```

```json
{
  "message": "Invalid email or password"
}
```

---

