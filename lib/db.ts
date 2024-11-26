// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_CON_STRING = process.env.MONGODB_CON_STRING || "";

if (!MONGODB_CON_STRING) {
  throw new Error("Please define the MONGODB_CON_STRING environment variable inside .env.local");
}

let cachedConnection: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedConnection && cachedConnection.readyState === 1) {
    console.log("Reusing existing database connection.");
    return cachedConnection;
  }

  try {
    console.log("Creating a new database connection.");
    const connection = await mongoose.connect(MONGODB_CON_STRING, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    } as ConnectOptions);
    cachedConnection = connection.connection;
    return cachedConnection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
