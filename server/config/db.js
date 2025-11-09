import mongoose from "mongoose"; //This brings in Mongoose, a tool that helps you talk to MongoDB using simple JavaScript code.

const connectDB = async () => { /*You’re creating a function named connectDB.
The async keyword means the function will handle asynchronous code — code that takes time to finish (like connecting to a database).*/
  try {
    await mongoose.connect(process.env.MONGO_URI);//This actually connects your server to MongoDB.it’s getting the MongoDB connection link from your .env file.
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;//This makes the function available to be used in other files (like app.js).

/*Purpose → To connect your Node.js backend to your MongoDB database.

Think of MongoDB as a “cloud notebook” where you save user and document data.

Mongoose is like your pen that helps you write neatly into that notebook.

connectDB() opens that notebook and connects your app to it.

.env holds the notebook’s “login link” safely.

If the link is correct, your app says ✅ “connected!”

If it’s wrong, it says ❌ “can’t connect” and stops running.*/