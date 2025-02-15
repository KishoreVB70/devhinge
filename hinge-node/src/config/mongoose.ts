import mongoose from "mongoose";
import env from "../utils/envVariables.js";
export const connectDB = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB");
};
