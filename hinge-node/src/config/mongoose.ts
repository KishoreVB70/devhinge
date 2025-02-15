import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error("MongoURI is not defined");
  }
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
};
