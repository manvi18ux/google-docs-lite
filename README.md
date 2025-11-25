A fully-functional Google Docs-style collaborative editor, built from scratch using:

React + TipTap

Y.js (CRDT engine)

Hocuspocus WebSocket Collaboration Server

Node.js + Express API

MongoDB

JWT Authentication

Supports realtime multi-user editing, live cursors, document sharing, and CRUD operations.

✨ Table of Contents

Overview

Tech Stack

Architecture

Features

Folder Structure

Setup Instructions

Environment Variables

Scripts

API Routes

Realtime Collaboration Internals

Future Enhancements

🔥 Overview

This project is a lightweight clone of Google Docs, featuring:

User accounts

Create/share/edit documents

Realtime collaborative editing with CRDT (Y.js)

Live cursors

WebSocket-based syncing

MongoDB persistence

The project is split into two servers:

1) Collaboration Server (Port 1234)

Handles realtime editing, WebSockets, and TipTap ↔ Y.js sync.

2) REST API Server (Port 5000)

Handles users, documents, authentication, and database logic.

And a frontend on Port 5173 (Vite).

🧠 Tech Stack
Frontend

React (Vite)

TipTap Editor (v2)

Y.js CRDT

Hocuspocus Provider

Realtime Collaboration

Y.Doc

Hocuspocus WebSocket Server

Awareness API for cursors

Backend API

Node.js

Express

MongoDB + Mongoose

JWT Authentication

bcryptjs

🏗 Architecture
                ┌────────────────────┐
                │      Frontend      │
                │  React + TipTap    │
                └─────────┬──────────┘
                          │ Y.js ops
                          ▼
                  WebSocket Provider
                          │
                          ▼
         ┌──────────────────────────────────┐
         │      Hocuspocus Collaboration    │
         │     (Y.Doc shared state CRDT)    │
         └───────────────────┬──────────────┘
                             │ Sync
                             ▼
                ┌─────────────────────────┐
                │    Multiple Clients     │
                │  (Browsers / Tabs)      │
                └─────────────────────────┘


                ┌─────────────────────────┐
                │        REST API         │
                │ Node + Express + JWT    │
                └─────────────────────────┘
                          │
                          ▼
                ┌─────────────────────────┐
                │        MongoDB          │
                │ Users, Docs metadata    │
                └─────────────────────────┘

⭐ Features
🔐 Phase-1: Backend API (Completed)

User signup/login

JWT authentication

Role-based access (owner, editor, viewer)

CRUD for documents

Store titles, user access, metadata

MongoDB persistence

⚡ Phase-2: Realtime Collab (Completed)

Multi-user realtime editing

CRDT-based merge (Y.js)

Live cursors + user colors

Automatic syncing

No overwrites, race-free editing

Hocuspocus WebSocket server

📁 Folder Structure
Google-doc-lite/
│
├── server/
│   ├── app.js                  # REST API server (port 5000)
│   ├── collab-server.js        # Hocuspocus collab server (port 1234)
│   ├── config/db.js            # Mongo connection
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/components/Editor.jsx
│   ├── src/pages/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repo
git clone <repo-url>
cd Google-doc-lite

2️⃣ Install Backend Dependencies
cd server
npm install

Start REST API:
node app.js

Start Collaboration Server (VERY IMPORTANT)
node collab-server.js

3️⃣ Install Frontend Dependencies
cd ../frontend
npm install


Start Vite:

npm run dev


Frontend → http://localhost:5173

API → http://localhost:5000

Collab → ws://localhost:1234

🔐 Environment Variables

Create server/.env:

MONGO_URI=mongodb://localhost:27017/google_docs_lite
JWT_SECRET=somethingsecret

🔗 API Routes
Auth

POST /api/auth/signup
POST /api/auth/login

Documents

GET /api/documents
POST /api/documents
PUT /api/documents/:id
DELETE /api/documents/:id

⚡ Realtime Collaboration Internals
✔ TipTap → Y.js:

Editor updates are converted into CRDT operations.

✔ Y.js → Provider:

CRDT ops sent via Awareness API.

✔ Provider → Hocuspocus WS Server:

WebSocket broadcasts ops to all connected clients.

✔ Hocuspocus → Other Clients:

Other users instantly apply the same Y.Doc update.

Result → Google Docs-style realtime editing.
