import Document from "../models/Document.js";

// Create
export const createDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newDoc = await Document.create({
      title,
      content,
      ownerId: req.user.id
    });
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; /*What happens here:

The frontend sends a request with a title and content.

We also get the logged-in user’s ID from req.user (that’s from your JWT).

Then we save this new document in MongoDB using Document.create().

Finally, we send back the created document with status 201 (which means “created successfully”).

In short: this route adds a new document to the database.*/

// Read all user documents
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ ownerId: req.user.id });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; /*What happens here:

It finds all documents where ownerId matches the logged-in user’s ID.

That means each user can only see their own documents.

In short: shows all the documents the user created.*/

// Read one
export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; /*What happens here:

The :id part in /documents/:id gives the document ID.

It searches for that document in MongoDB.

If not found, it returns a 404 error (means “not found”).

Otherwise, it returns that single document.

In short: fetches one specific document by its ID.*/

// Update
export const updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; /*What happens here:

It takes the new title and content from the request.

Finds the document by its ID.

Updates it with the new data.

{ new: true } makes MongoDB return the updated version.

Sends the updated document back as a response.

In short: edits an existing document.*/

// Delete
export const deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; /*What happens here:

It finds the document using the id from the URL.

Deletes it from MongoDB.

Returns a simple success message.

In short: removes a document permanently.*/


/*Purpose - This file handles everything related to documents in your app —like creating, reading, updating, or deleting them.
You can think of it as the "brain.

Why use req.user.id?
We use req.user.id because it tells us which user is making the request.

That ID comes from the JWT token the user gets after logging in.

So, when someone tries to create, read, update, or delete a document —
we check their req.user.id to make sure they only access their own documents, not anyone else’s.

What are CRUD operations?
They mean Create, Read, Update, Delete — the basic actions for any database system.

What happens if someone tries to access another user’s document?
They won’t get it, because we always filter by ownerId: req.user.id.

Why use async/await?
Database calls take time — async/await lets code wait for them to finish without freezing the app.

What is a 201 status?
It means “Created successfully” — used when something new is added to the database.*/