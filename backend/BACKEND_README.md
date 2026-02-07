# Spring Boot Backend Setup Guide

## Prerequisites
- Java 17
- Maven
- MySQL 8.0+

## Database Setup

1. **Install MySQL** (if not already installed)

2. **Create Database** (optional - will be created automatically):
   ```sql
   CREATE DATABASE esparcia_db;
   ```

3. **Update Database Credentials** (if needed):
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## Build and Run

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Build the project**:
   ```bash
   mvnw clean install
   ```
   Or on Linux/Mac:
   ```bash
   ./mvnw clean install
   ```

3. **Run the application**:
   ```bash
   mvnw spring-boot:run
   ```
   Or on Linux/Mac:
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication Endpoints (Public)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response (201 Created):
{
  "message": "User registered successfully",
  "userId": 1,
  "username": "johndoe"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "role": "USER"
}
```

### User Endpoints (Protected)

#### Get Current User
```
GET /api/user/me
Authorization: Bearer <your-jwt-token>

Response (200 OK):
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "enabled": true,
  "createdAt": "2026-02-07T10:00:00",
  "updatedAt": "2026-02-07T10:00:00"
}
```

## Security Features

- **BCrypt Password Encryption**: All passwords are encrypted using BCrypt
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **Token Expiration**: Tokens expire after 24 hours (86400000 ms)
- **CORS Configuration**: Configured to allow requests from `http://localhost:3000`

## Testing with Postman/cURL

### Register Example:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login Example:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Get Current User Example:
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Project Structure

```
backend/
├── src/main/java/com/esparcia/MyProject/
│   ├── controller/
│   │   ├── AuthController.java      # /api/auth endpoints
│   │   └── UserController.java      # /api/user endpoints
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   ├── RegisterRequest.java
│   │   └── UserResponse.java
│   ├── entity/
│   │   └── User.java                # User entity/model
│   ├── repository/
│   │   └── UserRepository.java      # JPA repository
│   ├── security/
│   │   ├── CustomUserDetailsService.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── JwtUtil.java
│   │   └── SecurityConfig.java
│   ├── service/
│   │   ├── AuthService.java
│   │   └── UserService.java
│   └── EsparciaApplication.java     # Main application
└── src/main/resources/
    └── application.properties        # Configuration
```

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL service is running
- Verify username and password in `application.properties`
- Check if port 3306 is available

### Port 8080 Already in Use
Change the port in `application.properties`:
```properties
server.port=8081
```

### JWT Token Issues
- Token expires after 24 hours
- Ensure you include "Bearer " prefix in Authorization header
- Check if JWT secret is properly configured

## Database Schema

The `users` table will be created automatically with the following structure:
- `id` (BIGINT, Primary Key)
- `username` (VARCHAR(50), Unique)
- `email` (VARCHAR(100), Unique)
- `password` (VARCHAR, BCrypt encrypted)
- `first_name` (VARCHAR(50))
- `last_name` (VARCHAR(50))
- `role` (VARCHAR(20), default: 'USER')
- `enabled` (BOOLEAN, default: true)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
