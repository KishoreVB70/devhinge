import "server only";
import { z } from "zod";

const serverEnvSchema = z.object({
  supabaseServiceRoleKey: z.string(),
  supabaseUrl: z.string(),
  supabaseAnonKey: z.string(),
  CLERK_SECRET_KEY: z.string(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
