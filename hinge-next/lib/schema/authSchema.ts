import { zUser } from "@/lib/schema/userSchema";
import { z } from "zod";

export const zAuthSchema = zUser
  .pick({
    email: true,
    password: true,
  })
  .required();

export type AuthSchema = z.infer<typeof zAuthSchema>;
