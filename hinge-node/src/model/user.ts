import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";
import { extendZod } from "@zodyac/zod-mongoose";

extendZod(z);

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be at most 32 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  )
  .refine((password) => !/\s/.test(password), {
    message: "Password must not contain spaces", // No spaces allowed
  });

export const zUser = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(18, { message: "Name must be at most 18 characters long" }),
  email: z.string().email().unique(),
  image: z.string().url({ message: "Invalid image URL" }),
  password: passwordSchema,
});

const userSchema = zodSchema(zUser);
export const User = model("User", userSchema);
