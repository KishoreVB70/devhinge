import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
});

export const clientEnv = clientEnvSchema.parse(process.env);
