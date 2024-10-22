# Requirements

## Database Schema

### Users Table

The `users` table stores user information.

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    price INTEGER CHECK (price >= 0) NOT NULL,
    category VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    quantity INTEGER CHECK (quantity > 0) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('pending', 'complete', 'active', 'canceled')) NOT NULL,
    CONSTRAINT fk_user_order FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_order FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS order_product (
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (order_id, product_id)
);


API Endpoints
User Routes
    Get All Users
        Endpoint: GET /users
        Description: Retrieve a list of all users.
    Get User by ID
        Endpoint: GET /users/:id
        Description: Retrieve information for a single user.
    Register User
        Endpoint: POST /users/registerUser
        Description: Register a new user.
    Update User
        Endpoint: PUT /users/:id
        Description: Update user details.
    Delete User
        Endpoint: DELETE /users/:id
        Description: Delete a user.

Product Routes
    Get All Products
        Endpoint: GET /products
        Description: Retrieve a list of all products.
    Get Product by ID
        Endpoint: GET /products/:id
        Description: Retrieve information for a single product.
    Register Product
        Endpoint: POST /products/registerProduct
        Description: Add a new product.
    Update Product
        Endpoint: PUT /products/:id
        Description: Update product details.
    Delete Product
        Endpoint: DELETE /products/:id
        Description: Delete a product.
    Get Products by Category
        Endpoint: GET /products/category/:category
        Description: Retrieve products belonging to a specific category.

Order Routes
    Get All Orders
        Endpoint: GET /orders
        Description: Retrieve a list of all orders.
    Get Orders by User ID
        Endpoint: GET /orders/user/:userId
        Description: Retrieve all orders placed by a specific user.
    Get Completed Orders by User ID
        Endpoint: GET /orders/user/:userId/order
        Description: Retrieve completed orders for a specific user.
    Create New Order
        Endpoint: POST /orders
        Description: Create a new order.
    Update Order Status
        Endpoint: PUT /orders/:id
        Description: Update the status of an existing order.
    Delete Order
        Endpoint: DELETE /orders/:id
        Description: Delete an existing order.

Service Implementations
User Service
    Fetch All Users: fetchAllUsers()
        Fetches all users from the database. Throws an error if no users are found.
    Fetch User Information: fetchUserInformation(user_id: number)
        Retrieves user details and generates a JWT token for the specified user. Throws an error if the user does not exist.
        Register User: registerUser(user: User)
        Registers a new user by checking for uniqueness of the username, hashing the password, and inserting into the database. Returns user data and a JWT token.
    Delete User: deleteUser(userId: number)
        Deletes a user from the database after verifying existence. Throws an error if the user is not found.
    Update User: updateUser(userId: number, updatedData: Partial<User>)
        Updates user details after verifying the user exists. Returns the updated user data and a success message.

Order Service
    Get All Orders: index()
        Fetches all orders from the database.
    Create Order: createOrder(order: Order)
        Inserts a new order into the database.
    Get Orders by User: getOrdersByUser(userId: number)
        Retrieves all orders associated with a specific user.
    Get Completed Orders by User: getCompletedOrdersByUser(userId: number)
        Retrieves completed orders for a specific user.
    Update Order Status: updateStatusOfOrder(orderId: number)
        Updates the status of a specified order.
    Delete Order: deleteOrder(orderId: number)
        Deletes a specified order from the database.

Product Service
    Fetch All Products: fetchAllProducts()
        Retrieves all products from the database.
    Fetch Product Information: fetchProductInformation(pr_id: number)
        Retrieves details for a specific product.
    Save Product: saveProduct(product: Product)
        Inserts a new product into the database.
    Delete Product: deleteProduct(prId: number)
        Deletes a specified product from the database.
    Update Product: updateProduct(prId: number, updatedData: Partial<Product>)
        Updates product details in the database.
    Get Products by Category: getProductsByCategory(category: string)
        Retrieves products that belong to a specified category.