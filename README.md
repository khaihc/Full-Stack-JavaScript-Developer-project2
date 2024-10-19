# Udacity Project 2: API with PostgreSQL and Express
This project is a RESTful API built with Node.js, Express, and PostgreSQL. It supports user management, product management, and order processing.

# Project Structure
    The project structure is as follows:
    src
    ├── middleware
    │   └── authentication.ts
    ├── queries
    │   ├── orderQueries.sql.ts
    │   ├── productQueries.sql.ts
    │   └── userQueries.sql.ts
    ├── routes
    │   ├── handle
    │   │   ├── orderRoute.ts
    │   │   ├── productRoute.ts
    │   │   └── userRoute.ts
    │   └── routes.ts
    ├── services
    │   ├── dbService.ts
    │   ├── ordersService.ts
    │   ├── productService.ts
    │   ├── responseService.ts
    │   └── userService.ts
    ├── types
    │   └── apiResponse.ts
    ├── connection.ts
    └── server.ts

## Getting Started
    To get started with this project, follow these steps:

1. **Clone the Repository**
   git clone https://github.com/khaihc/Full-Stack-JavaScript-Developer-project2.git
   cd main

2. **Install Dependencies**
    Make sure you have Node.js and npm installed. Then run: `npm install`
    Use the command npm run watch to run the application in development mode. This will start the app `npm run watch`, and you can use Postman to test the endpoints.

3. **Set Up Environment Variables**
    Create a .env file in the root directory and define your environment variables:
    PORT=5000
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5433
    POSTGRES_DB=postgres
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    BCRYPT_PASSWORD=udacity-project2
    SALT_ROUND=5
    SECRET_TOKEN=Project2:CreatinganAPIwithPostgreSQLandExpress

4. **Start the Server**
    To start the server, Then run: `npm run watch`
    The server will run on `http://0.0.0.0:5000`
    To test the server, Then run: `npm run test`

5. **Creating Tables in PostgreSQL**
    To create the database and tables, follow these steps:
    Go to the Migrations Folder: Open the `migrations` folder.
    Open the SQL File: Find the file named `postgres-project2.sql` and open it.
    Run the SQL Commands: Use a PostgreSQL tool like pgAdmin or psql and connect using the following information:
        Host: localhost
        Port: 5433
        Database: postgres
        User: postgres
        Password: postgres
    Execute the commands in postgres-project2.sql. This file contains all the necessary commands to create the database and tables.

6. **CRUD Operations with Postman**
    Import the Postman Collection
    Open Postman.
    Click on the Import button.
    Select the `udacity-project2.postman_collection.json` file from your project directory.
    Click Import.
