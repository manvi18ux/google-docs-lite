import mongoose from "mongoose";//you import Mongoose — the tool that helps your app talk to MongoDB easily.

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["owner", "editor", "viewer"],
    default: "viewer"
  }
}); /*🔹 name

The user’s full name.

required: true → they must enter a name while signing up.

🔹 email

Used for login and communication.

unique: true → means no two users can have the same email.

🔹 passwordHash

The user’s password, but encrypted (not stored as plain text).

This makes it secure — even if someone gets access to the database, they can’t see real passwords.

🔹 role

Defines what the user is allowed to do.

enum limits the possible roles to:

"owner" → full access to everything

"editor" → can edit documents

"viewer" → can only view documents

default: "viewer" means every new user automatically becomes a viewer unless specified otherwise.

export default mongoose.model("User", userSchema);


This creates a model called "User" from the schema.

Using this, you can:

Create new users → User.create()

Find a user by email → User.findOne({ email })

Get all users → User.find()*/

export default mongoose.model("User", userSchema);

/*Purpose - This file defines how each user will look inside the database.
It’s basically the template for every account in your app.

Imagine your database as a big table of people.
This schema tells MongoDB:

“Each person in this table must have a name, email, password, and a role.”

⚙️ How It Connects to Documents

Each document in your app (from your Document model) stores ownerId,
and that ownerId points to this User’s _id.
So MongoDB knows exactly which user created or owns each document.*/