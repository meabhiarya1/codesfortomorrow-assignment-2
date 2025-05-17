# Category & Service Management API

This project is a secure RESTful API for managing **Categories** and **Services** (along with their **Price Options**) using **JWT-based authentication**. All endpoints (except login) require a valid token.

Built with:

* Node.js + Express
* Sequelize ORM (MySQL)
* JWT for authentication

---

## Folder Structure

```
├── app.js
├── .env
├── /controllers
│   ├── authController.js
│   ├── categoryController.js
│   └── serviceController.js
├── /routes
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   └── serviceRoutes.js
├── /models
│   ├── user.js
│   ├── category.js
│   ├── service.js
│   └── servicePriceOption.js
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following:

```
PORT=5000
DB_NAME=codesfortomorrow
DB_USER=your_user
DB_PASS=your_pass
DB_HOST=localhost
JWT_SECRET=secret

```

---

## Database Models

### Category

```js
{
  name: String // Required, Unique
}
```

### Service

```js
{
  name: String,       // Required
  type: 'Normal' | 'VIP',
  CategoryId: Foreign Key
}
```

### PriceOption

```js
{
  duration: String,
  price: Number,
  type: 'Hourly' | 'Weekly' | 'Monthly',
  ServiceId: Foreign Key
}
```

---

## Admin Login Credentials

Only one login is allowed:

* **Email:** `admin@codesfortomorrow.com`
* **Password:** `Admin123!@#`

On app start, this admin user is auto-created (if it doesn’t exist).

---

## Authentication

All endpoints (except login) require a valid JWT token passed in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## API Endpoints

### Auth

#### `POST /api/login`

Login to receive a JWT token.

**Request Body**

```json
{
  "email": "admin@codesfortomorrow.com",
  "password": "Admin123!@#"
}
```

**Response**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### Category APIs

#### `POST /api/category`

Add a new category.

```json
{
  "name": "Haircut"
}
```

---

#### `GET /api/categories`

Fetch all categories.

---

#### `PUT /api/category/:categoryId`

Update a specific category.

```json
{
  "name": "Hair Styling"
}
```

---

#### `DELETE /api/category/:categoryId`

Delete category only if it has **no services**.

---

### Service APIs

#### `POST /api/category/:categoryId/service`

Add a new service to a category.

```json
{
  "name": "Basic Cut",
  "type": "Normal",
  "priceOptions": [
    {
      "duration": "30 mins",
      "price": 200,
      "type": "Hourly"
    },
    {
      "duration": "1 week",
      "price": 1200,
      "type": "Weekly"
    }
  ]
}
```

---

#### `GET /api/category/:categoryId/services`

Get all services under a category.

---

#### `PUT /api/category/:categoryId/service/:serviceId`

Update a specific service.

```json
{
  "name": "Deluxe Cut",
  "type": "VIP",
  "priceOptions": [
    {
      "duration": "1 hour",
      "price": 500,
      "type": "Hourly"
    }
  ]
}
```

---

#### `DELETE /api/category/:categoryId/service/:serviceId`

Delete a service from a category.

---

## Security

* All API routes are protected using a JWT middleware.
* Only admin user can access and modify data.
* Passwords are hashed using `bcryptjs`.

---

## Run the Project

1. Clone the repo:

   ```bash
   git clone https://github.com/meabhiarya1/codesfortomorrow-assignment-2
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file (as shown above).

4. Start the server:

   ```bash
   npm start
   ```

## Author

Developed by **@meabhiarya1**

---

## License

This project is licensed under the MIT License.
