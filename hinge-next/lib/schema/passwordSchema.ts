import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password must be at most 32 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  )
  .regex(/^\S+$/, "Password must not contain spaces");
