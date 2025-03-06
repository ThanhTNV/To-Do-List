![ci-react](https://github.com/ThanhTNV/To-Do-List/actions/workflows/ci-react.yml/badge.svg)
![ci-nest](https://github.com/ThanhTNV/To-Do-List/actions/workflows/ci-nest.yml/badge.svg)

# Link Video Demo: 
https://drive.google.com/file/d/1dO12Bavs_SHzHZmZ3YP0bKL32Ckh-jKe/view

# Todo List MERN Application

A complete Todo List application with a modern React frontend and a NestJS backend API.

## Overview

This project is a full-stack Todo List application built using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript. It features a sleek, interactive frontend and a robust RESTful API backend.

## Architecture

The application is organized into two main components:

- Frontend (todo-list-fe): React-based UI with modern features
- Backend (todo-list-be): NestJS API providing todo management endpoints

## Features

### Frontend

- ✅ Create, edit, and delete tasks
- ✓ Mark tasks as completed/active
- 🔍 Filter tasks by status (All, Active, Completed)
- 🧹 Clear completed tasks with one click
- 💾 Local storage persistence for data retention
- 🎭 Smooth animations with Framer Motion
- 📱 Responsive design for all devices

### Backend

- Full CRUD Operations for todo items
- RESTful API design with predictable endpoints
- Modern TypeScript implementation
- Comprehensive testing coverage

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- MongoDB (for backend data storage)

### Installation

1. Clone the repository

```bash
git clone https://github.com/ThanhTNV/To-Do-List
cd todo-list-mern
```

2. Install backend dependencies

```bash
cd todo-list-be
pnpm install
```

3. Install frontend dependencies

```bash
cd ../todo-list-fe
pnpm install
```

## Running the Application

### Backend

```bash
cd todo-list-be
pnpm run start:dev
```

The API will be available at http://localhost:3000

### Frontend

```bash
cd todo-list-fe
pnpm dev
```

The frontend will be available at http://localhost:5173

## API Endpoints

|**Method** |**Endpoint**| **Description**|
|----|----|----|
|GET|/todo|Get all todos|
|GET|/todo/:id|Get a specific todo|
|POST|/todo|Create a new todo|
|PATCH|/todo/:id|Update a todo|
|DELETE|/todo/:id|Delete a todo|

### Example API Request
```bash
# Create a new todo
curl -X POST http://localhost:3000/todo \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn NestJS", "description": "Complete the tutorial", "completed": false}'
```

## Testing
### Backend Tests
```bash
cd todo-list-be
# Run unit tests
pnpm run test

# Run end-to-end tests
pnpm run test:e2e

# Generate test coverage
pnpm run test:cov
```

### Frontend Tests
```bash
cd todo-list-fe
# Run tests in watch mode
pnpm test

# Generate test coverage
pnpm coverage
```
## Project Structure
```
todo-list-mern/
├── todo-list-be/           # Backend NestJS application
│   ├── src/
│   │   ├── todo/           # Todo module
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── entities/   # Todo entity definition
│   │   │   └── ...
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── test/               # End-to-end tests
│
└── todo-list-fe/           # Frontend React application
    ├── app/                # Application routes
    ├── components/         # React components
    │   ├── todo-item/      # TodoItem component
    │   ├── todo-list/      # TodoList component
    │   └── ui/             # Reusable UI components
    ├── lib/                # Utility functions
    └── test/               # Test files
```

## Deployment
### Docker Deployment
The frontend includes Dockerfiles for different package managers:
```bash
# Build frontend (using pnpm)
cd todo-list-fe
docker build -f Dockerfile.pnpm -t todo-list-app-fe .

# Run frontend container
docker run -p 3000:3000 todo-list-app-fe
```
## Technologies Used
### Frontend
- React 19
- TypeScript
- React Router
- TailwindCSS
- Framer Motion
- Vitest & Testing Library
### Backend
- NestJS
- TypeScript
- Jest for testing
## License
This project is MIT licensed.
