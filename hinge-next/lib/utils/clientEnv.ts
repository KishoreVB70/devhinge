import { z } from "zod";

const clientEnvSchema = z.object({
  supabaseUrl: z.string(),
  supabaseAnonKey: z.string(),
});

export const clientEnv = clientEnvSchema.parse(process.env);
