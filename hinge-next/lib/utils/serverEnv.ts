"server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  supabaseServiceRoleKey: z.string(),
  supabaseUrl: z.string(),
  supabaseAnonKey: z.string(),
  JWT_SECRET: z.string(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
