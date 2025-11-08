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
};

// Read all user documents
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ ownerId: req.user.id });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read one
export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
};

// Delete
export const deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
