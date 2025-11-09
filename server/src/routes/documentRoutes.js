import express from "express";//Import Express to create a router.
import {//mport all functions from your document controller
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
} from "../controllers/documentController.js"; 
import { protect } from "../middleware/authMiddleware.js"; //Import protect middleware — this ensures only logged-in users can access these routes.

const router = express.Router(); //Creates a router object — like a mini-server for /documents.

router.post("/", protect, createDocument); /*POST / → Create a new document.

protect → only logged-in users can do this.

Calls createDocument from the controller.*/
router.get("/", protect, getDocuments);//GET / → Fetch all documents owned by the logged-in user.
router.get("/:id", protect, getDocumentById);//GET /:id → Fetch one specific document by its ID.
router.put("/:id", protect, updateDocument);//PUT /:id → Update a document with new data.
router.delete("/:id", protect, deleteDocument);//DELETE /:id → Remove a document permanently.

export default router;//Makes this router available to app.js

/*This file defines the API endpoints for documents — basically, it tells the server what to do when a user wants to create, read, update, or delete a document.
It also uses JWT protection so only logged-in users can access these routes.

Simple analogy

Think of /api/documents as a document folder.

The routes are like actions you can do with the folder:

POST → add a new file

GET → see all your files

GET /:id → open one file

PUT → edit a file

DELETE → throw away a file

protect ensures only the owner of the folder can do these actions.*/