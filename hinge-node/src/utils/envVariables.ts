import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  MONGO_URI: z.string().url({ message: "DATABASE_URL must be a valid URL" }),
  JWT_SECRET: z
    .string()
    .min(32, { message: "JWT_SECRET must be at least 32 characters long" }),
});

const env = envSchema.parse(process.env);
export default env;
