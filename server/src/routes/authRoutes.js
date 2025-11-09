import express from "express";
import { signup, login } from "../controllers/authController.js";//Import Express to create a router.Import the signup and login functions from your controller — these are the actual functions that handle user registration and login logic.

const router = express.Router();/*Create a router object that will hold all routes for authentication.

Think of it as a mini-server for /auth related actions.*/

router.post("/signup", signup);/*When someone sends a POST request to /signup, run the signup function.

POST is used because we are sending data (name, email, password) to the server to create a new user.*/
router.post("/login", login);/*When someone sends a POST request to /login, run the login function.

Again, POST is used because the user is sending credentials to the server for authentication.*/

export default router;

/*This file defines the endpoints for user signup and login.
It tells your backend which function to run when someone hits a specific URL.

Simple Analogy:

Imagine /api/auth is a gate for authentication.

/signup → new user wants to enter → “here’s your ID card”

/login → existing user comes back → “verify your ID”

Each route tells the backend which action to perform.

Why POST instead of GET?

POST is used when you are sending data to the server that will create or change something.

GET is only used to fetch data, not to send it.

Example:

/signup → sending name, email, password → creates a new user → POST

/login → sending email and password → server checks and logs in → POST

So anytime your request changes the server’s data or sends sensitive info like passwords, you use POST.

How JWT tokens are issued

User signs up or logs in successfully.

Backend creates a JWT token using a secret key (from .env).

Token contains info like:

user ID

role

Server sends the token back to the user.

The user stores this token (in memory, localStorage, or cookies).

Every time the user wants to access protected routes (like /documents), they send this token in the Authorization header.

Backend verifies the token to check who the user is before allowing access.
*/