import { passwordSchema } from "@/lib/schema/passwordSchema";
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export type AuthSchema = z.infer<typeof authSchema>;
