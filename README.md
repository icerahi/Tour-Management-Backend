
# 🌍 Tour Management System - Backend

A robust RESTful API built with **Express.js** and **TypeScript** for managing tours, bookings, and users. This backend serves as the core engine for a Tour Management Application, providing secure authentication, role-based access control, and efficient data handling.

## 🚀 Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Validation:** Zod
- **Linting & Formatting:** ESLint, Prettier
- **API Testing:** Postman

## ✨ Features

- **Authentication & Authorization:** Secure user login and registration (JWT-based).
- **Tour Management:** CRUD operations for creating, updating, and deleting tour packages.
- **Booking System:** Handle user bookings and reservations.
- **User Roles:** Admin and User role differentiation for protected routes.
- **Error Handling:** Global error handling middleware for consistent API responses.
- **Data Validation:** Strict input validation ensuring data integrity.

## 📂 Project Structure

```bash
src/
├── app/
│   ├── modules/         # Modular structure (Users, Tours, Bookings)
│   │   ├── user/
│   │   ├── tour/
│   │   └── booking/
│   ├── middlewares/     # Global middlewares (Auth, Error Handler)
│   ├── routes/          # Application routes
│   └── utils/           # Utility functions
├── server.ts            # Entry point
└── app.ts               # Express app configuration
````

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1\. Clone the Repository

```bash
git clone https://github.com/icerahi/Tour-Management-Backend.git
cd Tour-Management-Backend
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=1d
```

### 4\. Run the Application

**Development Mode:**

```bash
npm run start:dev
```

**Production Mode:**

```bash
npm run build
npm start
```

## 🔌 API Documentation

You can explore the API endpoints using the Postman collection included in this repository.

  - **File:** `Backend PH Tour Management APIs.postman_collection.json`
  - **Import:** Open Postman -\> Import -\> Select the file from the root directory.

## 🤝 Contributing

Contributions are welcome\! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/new-feature`).
3.  Commit your changes (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature/new-feature`).
5.  Open a Pull Request.


-----

**Developed by [Imran Hasan](https://github.com/icerahi)**

```
```
