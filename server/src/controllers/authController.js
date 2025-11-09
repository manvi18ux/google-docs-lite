import bcrypt from "bcryptjs";//Used to hide passwords by converting them into unreadable strings before saving them in the database.
import User from "../models/User.js";//This is your user model (MongoDB collection) where user info like name, email, and password are stored.
import jwt from "jsonwebtoken";//Used to create a token when a user logs in. That token proves who they are in later requests.

export const signup = async (req, res) => { //when someone signs up, they send their name, email, password, and maybe a role
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) //If any field is missing → return an error.
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email }); //Before creating a new account, we check the database.If there’s already a user with that email → stop and show a message.
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10); //We never store real passwords in the database.bcrypt.hash() mixes the password with a salt (random data) and creates a hashed password — impossible to reverse.
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, passwordHash, role });//Now the new user record is saved in the database with the hashed password.

    const token = jwt.sign( 
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    ); /*This creates a token that:

Contains the user’s ID and role.

Is signed with your secret key (from .env).

Lasts for 7 days.

This token is what allows the user to access protected APIs later (like creating documents).*/

    res.status(201).json({ 
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });//This gives the user:Their token (for authentication)Their basic info (without showing the password)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => { //When a user tries to log in, they send email and password.
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //If no user found → send error.
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash); //Compares entered password with stored hashed password.
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ //Now the user can use this token to call protected routes like /api/documents.
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/*Purpose - This file handles signup and login — meaning how new users register and existing users log in.

Why did you use bcrypt?
To hide the password before saving. Even if the database leaks, real passwords can’t be read.

Why JWT?
It gives a token to users after login, which helps the server know who’s making a request without storing session data.

Why do we store the JWT secret in .env?
To keep it private. It’s like a password for creating/verifying tokens.

Why not store passwords as plain text?
That’s unsafe — if data leaks, everyone’s password would be exposed.

What does await mean in your code?
It waits until the async function (like saving to DB) finishes before moving to the next line.

Why 7 Days?
We set expiresIn: "7d" in JWT so that the token automatically becomes invalid after 7 days.
That means the user will need to log in again after one week to get a new token.
It’s like saying:
“You’re trusted for a week, then prove again who you are.”
If you make the token valid forever, and it gets stolen (say from localStorage or an API leak),
the hacker could use it permanently to access the account.
That’s a big security risk.*/