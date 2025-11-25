import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") /*When a logged-in user sends a request, they include their token in the header, like this:

Authorization: Bearer your_token_here


This checks if that header exists and starts with the word "Bearer".*/
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];//This takes the actual token part (after the word “Bearer”). Example:"Bearer abc123" After splitting:token = "abc123".
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-passwordHash"); /*Once verified, we decode the token and get the user's ID from it.

Then we fetch the user from MongoDB (but don't include the passwordHash for safety).

This adds the user's info to req.user, so now other routes can use it.*/
      return next();/*This moves the request forward to the next function — like the controller (create, update, etc.).

If this line isn't called, the request stops here.*/
    } catch (err) {
      return res.status(401).json({ message: "Not authorized" }); //If the token is missing or invalid, it sends back a "Not authorized" message.
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
/*This middleware checks if the user is logged in and has a valid token before letting them access protected routes (like creating or editing a document).

It’s like a security guard standing at the door of every protected API route.

In simple terms:

User logs in → gets a token.

Next time they send a request → they attach that token.

This middleware checks the token → if valid, user continues; if not, access denied.

🧱 Real-life example:

Imagine your app is a library:

Only people with valid ID cards (tokens) can enter.

The guard (this middleware) checks the ID before letting them in.

If the card is fake or expired → you can’t enter.*/