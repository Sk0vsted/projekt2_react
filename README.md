# Secure User Authentication System

## Project Overview
As part of my second-semester project, I was tasked with implementing a system where the server prevents SQL injection attacks in user queries via a browser. The system allows queries across multiple fields and includes a small test database.

Since the project was initially developed in Vue, you can find the Vue version here:
https://github.com/Sk0vsted/2sem_projektA

This repository, however, contains a Next.js version of the project.

## Features:
**Secure User Authentication**
- Implements password hashing using bcrypt.js.
- Uses express-rate-limit to prevent brute-force attacks.
- Compares passwords against 14 million leaked passwords using Rockyou.js and Rockyou.txt.

**SQL Injection Prevention**
- Uses SQLite3 with prepared statements to sanitize user input.

**Modern Frontend**
- Built with TypeScript and Next.js.
- Uses Framer Motion for smooth animations.
- Implements React hooks (useState, useEffect) to manage user input and API calls
- Utilizes Next.js router for navigation between login, register, and homepage.

## Tech stack:
- **Backend:** Node.js, Express.js, SQLite3
- **Frontend:** Next.js, TypeScript, Framer Motion
- **Security:** bcrypt.js, express-rate-limit, Rockyou.js

## Installation and setup:
### Prerequisites
Ensure you have the following installed:
- Node.js
- SQLite3

### Clone the repository
```
$ git clone https://github.com/Sk0vsted/2sem_projektA.git
$ cd 2sem_projektA
```

### Install dependencies (both frontend and backend folder)
```
$ cd frontend
$ npm install
$ cd ..
$ cd backend
$ npm install
```

### Database setup
To create the **users.db** database and initialize the users table, run the following commands:
```
$ sqlite3 users.db
sqlite> CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

### Start development server
```
$ npm run dev
```
The backend will be running on http://localhost:3000

## API Endpoints
### Register User
**Post** ```/api/register```
Request Body:
```
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
Correct reponse:
```
{
  "message": "User registered successfully"
}
```
### Login User
**Post** ```/api/login```
Request Body:
```
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
Correct reponse:
```
{
  "message": "User logged in successfully."
}
```

## Security Measures
- **Prepared Statements:** Prevents SQL injection by using parameterized queries
- **Password Hashing:** Uses bcrypt.js to securely hash user passwords before storing them.
- **Rate Limiting:** express-rate-limit is used to prevent brute-force attacks
- **RockYou Password Check:** Compares user passwords against leaked passwords in Rockyou.txt to prevent weak password usage.

## Frontend Implementation
- Uses **TypeScript** for strict typing and type safety
- Utilizes **React Hooks** (```useState```, ```useEffect```) to manage authentication state
- **Framer Motion** is used for UI animations.
- **Next.js Router** handles navigation between pages

## Future work...
- JWT Authentication for session management
- Password reset functionality
- Improve UI/UX with Tailwind
- Better error handling
