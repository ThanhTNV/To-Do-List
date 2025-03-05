# Todo List API
A RESTful API for managing todo items built with NestJS.

<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p>

## Description
This project is a Todo List API built with NestJS, providing endpoints to create, read, update, and delete todo items. Perfect for learning NestJS or as a backend for your todo application.

## Features
- Full CRUD Operations: Create, read, update, and delete todo items
- RESTful API Design: Follows REST principles for predictable endpoints
- Modern TypeScript: Written in TypeScript for better type safety
- Comprehensive Testing: Includes unit and e2e tests for all features

## Project Structure
```
todo-list/
├── src/
│   ├── todo/              # Todo module
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entities/      # Todo entity definition
│   │   ├── todo.controller.ts
│   │   ├── todo.service.ts
│   │   └── ...
│   ├── app.module.ts
│   └── main.ts
└── test/                  # End-to-end tests
```

## Installation
```bash
pnpm install
```

## Running the app
```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## API Endpoints
|Method|Endpoint|Description|
|---|---|---|
|GET|/todo|Get all todos|
|GET|/todo/:id|Get a specific todo|
|POST|/todo|Create a new todo|
|PATCH|/todo/:id|Update a todo|
|DELETE|/todo/:id|Delete a todo|

## Example Request
```bash
# Create a new todo
curl -X POST http://localhost:3000/todo \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn NestJS", "description": "Complete the tutorial", "completed": false}'
```
## Testing
```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## Development
This project uses NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

If you're new to NestJS, check out the following resources:

- NestJS Documentation
- NestJS Discord channel
## License
This project is MIT licensed.