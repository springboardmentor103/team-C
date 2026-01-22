# HireHelper Backend

This folder contains the backend structure for the HireHelper application.

## Milestone-1 Scope
- User Registration
- OTP Verification
- Login

Backend for **HireHelper** built with **Node.js**, **Express**, and **MongoDB**. Handles **user registration**, **OTP verification**, and **login** with JWT authentication.

---

## Features
- User registration with OTP
- OTP verification
- Login with JWT
- Password hashing with bcryptjs
- MongoDB integration using Mongoose

---

## Tech Stack
- Node.js, Express.js
- MongoDB, Mongoose
- bcryptjs, jsonwebtoken
- dotenv for environment variables

---

## Folder Structure
backend/
├── controllers/ # Request handling logic
│ └── authController.js
├── models/ # Mongoose models
│ └── User.js
├── routes/ # API routes
│ └── auth.js
├── config/ # DB connection
│ └── db.js
├── package.json
└── server.js # Entry point
