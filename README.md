# Todo App with Authentication

A full-stack todo application with user authentication (register/login) built with React, Node.js, Express, and MySQL.

## Features

- User Registration
- User Login with JWT token authentication
- Protected todo routes
- Add, view, and delete todos

## Tech Stack

### Frontend
- React 19
- React Router v7
- Axios
- Vite

### Backend
- Node.js
- Express 5
- MySQL2
- JWT (jsonwebtoken)
- Bcrypt

## Prerequisites

- Node.js (v18 or higher)
- MySQL or MariaDB

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd todo_app
```

### 2. Set up the database

Make sure MySQL is running on your system. Then run the database setup script:

```bash
cd backend
node scripts/setup-db.js
```

This will create the `todo_app` database with `users` and `todos` tables.

### 3. Configure environment variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DB_NAME=todo_app
DB_USER=root
DB_HOST=localhost
DB_PASSWORD=
JWT_SECRET=your_secret_key_here
```

### 4. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Running the Application

### Start the backend server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start the frontend development server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is in use)

## Usage Flow

1. Open the frontend in your browser
2. You'll be redirected to the login page
3. Click "Register" to create a new account
4. After registration, you'll be redirected to login
5. Login with your credentials
6. You'll be redirected to the todo page where you can add and delete todos

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos (Protected)
- `GET /api/todos` - Get all todos for the logged-in user
- `POST /api/todos` - Create a new todo
- `DELETE /api/todos/:id` - Delete a todo

## License

MIT