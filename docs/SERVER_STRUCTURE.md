# Server Folder Structure

This document provides an overview of the server-side folder structure for the HimVidhya application.

## Directory Tree

```
server/
├── .env                              # Environment variables (git-ignored)
├── .env.example                      # Example environment variables template
├── .gitignore                        # Git ignore rules
├── logger.js                         # Winston logger configuration
├── package.json                      # Node.js dependencies and scripts
├── README.md                         # Server documentation
├── server.js                         # Main application entry point
│
├── config/                           # Configuration files
│   ├── apiVersion.js                 # API versioning configuration
│   ├── database.js                   # MongoDB connection setup
│   └── jwt.js                        # JWT token configuration
│
├── constants/                        # Application constants
│   └── queryConstant.js              # Query-related constants
│
├── controllers/                      # Request handlers
│   ├── announcement.controller.js    # Announcement endpoints
│   ├── attendance.controller.js      # Attendance tracking endpoints
│   ├── auth.controller.js            # Authentication endpoints
│   ├── class.controller.js           # Class management endpoints
│   ├── deadline.controller.js        # Deadline management endpoints
│   └── user.controller.js            # User management endpoints
│
├── helpers/                          # Helper utilities
│   ├── asyncHandler.js               # Async error wrapper
│   ├── helpers.js                    # General utility functions
│   └── prepareEmail.js               # Email template preparation
│
├── logs/                             # Application logs (git-ignored)
│
├── middleware/                       # Express middleware
│   ├── auth.middleware.js            # JWT authentication middleware
│   ├── errorHandler.middleware.js   # Global error handler
│   ├── permissions.middleware.js    # Permission checking middleware
│   ├── rateLimiter.middleware.js    # Rate limiting middleware
│   ├── role.middleware.js           # Role-based access control
│   └── validateRequest.middleware.js # Zod schema validation
│
├── models/                           # Mongoose models (Database schemas)
│   ├── Announcement.model.js         # Announcement schema
│   ├── AttendanceRecord.model.js    # Individual attendance record schema
│   ├── AttendanceSession.model.js   # Attendance session schema
│   ├── Class.model.js               # Class/classroom schema
│   ├── Deadline.model.js            # Deadline/assignment schema
│   └── User.model.js                # User schema
│
├── permissions/                      # Permission rules
│   └── rules.js                     # RBAC permission rules
│
├── routes/                           # API route definitions
│   ├── announcement.route.js         # Announcement routes
│   ├── attendance.route.js          # Attendance routes
│   ├── auth.route.js                # Authentication routes
│   ├── class.route.js               # Class routes
│   ├── deadline.route.js            # Deadline routes
│   ├── protected.route.js           # Protected routes aggregator
│   └── user.route.js                # User routes
│
├── schemas/                          # Validation schemas
│   └── validationSchemas.js         # Zod validation schemas
│
├── services/                         # Business logic layer
│   ├── auth.service.js              # Authentication business logic
│   ├── class.service.js             # Class business logic
│   └── user.service.js              # User business logic
│
└── utils/                            # Utility functions
    ├── email.js                      # Email sending utilities
    ├── responseParser.js            # Standard API response formatter
    └── error/                        # Error handling utilities
        ├── errors.js                 # Custom error classes
        ├── handler.js                # Error handler functions
        ├── index.js                  # Error utilities entry point
        └── status-codes.js          # HTTP status code constants
```

## Folder Descriptions

### `/config`

Configuration files for database connections, JWT settings, and API versioning.

### `/controllers`

Controllers handle HTTP requests and responses. They validate input, call services, and return formatted responses.

### `/middleware`

Express middleware for authentication, authorization, validation, error handling, and rate limiting.

### `/models`

Mongoose schemas that define the structure of MongoDB documents and include validation, methods, and hooks.

### `/routes`

Route definitions that map HTTP endpoints to controller functions. Routes are organized by feature.

### `/services`

Business logic layer that handles data processing, database operations, and complex operations. Controllers call services to perform actions.

### `/schemas`

Zod validation schemas for request validation using the `validateRequest` middleware.

### `/utils`

Reusable utility functions for email sending, response formatting, and error handling.

### `/permissions`

Role-Based Access Control (RBAC) rules that define what actions different user roles can perform.

### `/helpers`

General helper functions and wrappers used throughout the application.

## Key Features

- **Modular Architecture**: Separation of concerns with distinct layers (routes → controllers → services → models)
- **API Versioning**: Supports versioned API endpoints (e.g., `/api/v1/`)
- **Authentication**: JWT-based authentication with HTTP-only cookies
- **Authorization**: Role-based access control (RBAC) with permission rules
- **Validation**: Request validation using Zod schemas
- **Error Handling**: Centralized error handling with custom error classes
- **Logging**: Winston logger for application logs
- **Security**: Rate limiting, helmet security headers, CORS configuration

## Environment Variables

Required environment variables (see `.env.example`):

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `CLIENT_URL` - Frontend application URL
- `EMAIL_SENDER_USER` - Email service username (production)
- `EMAIL_SENDER_PASSWORD` - Email service password (production)
- `FRONTEND_URL` - Frontend URL for email links (production)

## API Structure

All API routes are versioned and follow the pattern:

```
/api/v1/<resource>/<endpoint>
```

Example:

- `/api/v1/auth/register` - User registration
- `/api/v1/auth/login` - User login
- `/api/v1/classes` - Class management
- `/api/v1/users` - User management
