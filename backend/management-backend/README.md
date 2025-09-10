# Market Management Backend

This project is a full market management system backend built with Node.js, Express, and PostgreSQL. It provides a RESTful API for managing users, products, orders, suppliers, invoices, and reports.

## Project Structure

```
market-management-backend
├── src
│   ├── app.js                  # Entry point of the application
│   ├── config
│   │   └── db.js               # Database configuration and connection
│   ├── controllers
│   │   ├── authController.js    # User authentication functions
│   │   ├── productController.js  # Product management functions
│   │   ├── orderController.js    # Order management functions
│   │   ├── supplierController.js  # Supplier management functions
│   │   ├── invoiceController.js   # Invoice management functions
│   │   └── reportController.js    # Report generation functions
│   ├── models
│   │   ├── userModel.js          # User model
│   │   ├── productModel.js       # Product model
│   │   ├── orderModel.js         # Order model
│   │   ├── supplierModel.js      # Supplier model
│   │   ├── invoiceModel.js       # Invoice model
│   │   └── reportModel.js        # Report model
│   ├── routes
│   │   ├── authRoutes.js         # User authentication routes
│   │   ├── productRoutes.js      # Product management routes
│   │   ├── orderRoutes.js        # Order management routes
│   │   ├── supplierRoutes.js     # Supplier management routes
│   │   ├── invoiceRoutes.js      # Invoice management routes
│   │   └── reportRoutes.js       # Report generation routes
│   ├── middleware
│   │   └── authMiddleware.js     # Authentication middleware
│   └── utils
│       └── apiResponse.js        # Utility functions for API responses
├── package.json                  # NPM configuration file
├── .env                          # Environment variables
└── README.md                     # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd market-management-backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your database connection details:
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**
   ```
   npm start
   ```

## API Usage

### User Authentication

- **Login**
  - **POST** `/api/auth/login`
    - Request: `{ "username": "user", "password": "pass" }`
    - Response: `{ "token": "jwt_token", "user": { "id": 1, "username": "user" } }`

- **Register**
  - **POST** `/api/auth/register`
    - Request: `{ "username": "user", "password": "pass" }`
    - Response: `{ "message": "User registered successfully" }`

### Product Management

- **Get Products**
  - **GET** `/api/products`
    - Response: `[{ "id": 1, "name": "Product A", "price": 100 }]`

- **Create Product**
  - **POST** `/api/products`
    - Request: `{ "name": "Product A", "price": 100 }`
    - Response: `{ "message": "Product created", "product": { "id": 1, "name": "Product A", "price": 100 } }`

### Order Management

- **Get Orders**
  - **GET** `/api/orders`
    - Response: `[{ "id": 1, "productId": 1, "quantity": 2 }]`

- **Create Order**
  - **POST** `/api/orders`
    - Request: `{ "productId": 1, "quantity": 2 }`
    - Response: `{ "message": "Order created", "order": { "id": 1, "productId": 1, "quantity": 2 } }`

### Supplier Management

- **Get Suppliers**
  - **GET** `/api/suppliers`
    - Response: `[{ "id": 1, "name": "Supplier A" }]`

- **Create Supplier**
  - **POST** `/api/suppliers`
    - Request: `{ "name": "Supplier A" }`
    - Response: `{ "message": "Supplier created", "supplier": { "id": 1, "name": "Supplier A" } }`

### Invoice Management

- **Get Invoices**
  - **GET** `/api/invoices`
    - Response: `[{ "id": 1, "orderId": 1, "amount": 200 }]`

- **Create Invoice**
  - **POST** `/api/invoices`
    - Request: `{ "orderId": 1, "amount": 200 }`
    - Response: `{ "message": "Invoice created", "invoice": { "id": 1, "orderId": 1, "amount": 200 } }`

### Report Generation

- **Get Sales Report**
  - **GET** `/api/reports/sales`
    - Response: `[{ "date": "2023-01-01", "total": 1000 }]`

- **Get Inventory Report**
  - **GET** `/api/reports/inventory`
    - Response: `[{ "productId": 1, "quantity": 50 }]`

## License

This project is licensed under the MIT License.