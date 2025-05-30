# NestJS Home Assignment

This repository contains a NestJS application that provides a RESTful API for user authentication and task management.

## 🚀 Deployment

The application is deployed and accessible at the following URL:

**Render Cloud**: [https://nest-home-assigment.onrender.com](https://nest-home-assigment.onrender.com)

### Local Deployment with Docker Compose

You can also run the application locally using Docker Compose. Make sure you have Docker and Docker Compose installed on your machine.

## 📊 Database

The application uses PostgreSQL with the `pg` library for running raw SQL queries. The database connection is configured through the `DATABASE_URL` environment variable.

A migration system is included with the project:

- Initial migration is available at `migrations/1748508492124_init-migration.js`
- Run migrations with `npm run migrate`

## 🧪 Testing

### Postman Collection

A Postman collection is included in the `postman` folder for testing the API endpoints.

**Note**: You may need to change the following collection variables:

- `base_url` (default: localhost:3000)
- `protocol` (default: http)

To use the collection:

1. Import `postman/backend-demo.postman_collection.json` into Postman
2. Update the collection variables if needed
3. Run the requests in sequence, starting with authentication

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration modules
├── modules/
│   ├── auth/               # Authentication module
│   ├── database/           # Database connection and base repository
│   ├── health/             # Health check endpoints
│   ├── task/               # Task management module
│   ├── token/              # Token management module
│   └── user/               # User management module
└── main.ts                 # Application entry point
```

## 🔐 API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and receive JWT token
- `POST /auth/reset/request` - Request password reset
- `POST /auth/reset/confirm` - Confirm password reset with token

### Tasks (Protected Routes)

- `GET /task` - Get all tasks for the authenticated user
- `GET /task/:id` - Get a specific task by ID
- `POST /task` - Create a new task
- `PATCH /task/:id` - Update an existing task
- `DELETE /task/:id` - Delete a task
- `GET /task/search` - Search tasks with filters

### System

- `GET /health` - Health check endpoint

## 🧰 Running Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Tests
npm run test
npm run test:e2e

# Database migrations
npm run migrate up
```
