# Google Docs Lite (Phase-1 Backend)

A lightweight backend for a collaborative document editor with authentication and document CRUD.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Features Implemented
- User Signup & Login with JWT
- User roles: owner, editor, viewer
- CRUD operations for documents
- JWT-protected routes

## Folder Structure

server/
├── src/
│ ├── controllers/ # Auth & Document controllers
│ ├── middleware/ # JWT auth middleware
│ ├── models/ # User & Document models
│ └── routes/ # API routes
├── config/
│ └── db.js # MongoDB connection
├── app.js # Express server entry point
└── .env.example # Example env variables


