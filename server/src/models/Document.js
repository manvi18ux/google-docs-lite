import mongoose from "mongoose";/*Mongoose is a library that helps you easily connect and work with MongoDB using JavaScript.

It allows you to create schemas (like this one) that define how data should be stored.*/

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: "" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
); /*
🔹 title

This is the name of the document (like “My Notes” or “Project Plan”).

type: String → means it will always be text.

required: true → means user must provide it when creating a document.

🔹 content

This holds the actual text written inside the document.

If the user doesn’t type anything, it’ll just store an empty string (default: "").

🔹 ownerId

This stores which user owns the document.

It connects each document to a specific user using that user’s MongoDB ID.

ref: "User" → tells Mongoose this field refers to the User model.

This is how we make a relationship between users and documents.

🔹 { timestamps: true }

This automatically adds:

createdAt → when the document was first made.

updatedAt → when it was last edited.*/
export default mongoose.model("Document", documentSchema); /*This creates a model named "Document" based on the schema above.

This model lets you do things like:

Document.create() → create a new document

Document.find() → get all documents

Document.findByIdAndUpdate() → update a document

Document.findByIdAndDelete() → delete a document*/

/*Purpose - This file defines the structure of how a document will look inside your MongoDB database.
Think of it like creating a blueprint or a template for all documents stored in the “Documents” collection.

Think of MongoDB as a bookshelf,
and this schema as a book template — it defines what every book (document) must have:

a title (name of book),

content (text inside),

and an ownerId (who wrote/owns it).

Every time a user creates a new doc, MongoDB adds another “book” following this same template.
*/