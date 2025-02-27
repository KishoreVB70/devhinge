import { zUser } from "@/lib/schema/userSchema";
import { z } from "zod";

export const zCustomSigunpInput = zUser
  .pick({
    email: true,
    password: true,
    age: true,
    name: true,
    gender: true,
  })
  .required();

export type CustomSigunpInput = z.infer<typeof zCustomSigunpInput>;
export const zSignupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type signupInputs = z.infer<typeof zSignupInput>;
