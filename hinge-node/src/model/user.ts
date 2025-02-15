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

  email: z.string().email(),

  age: z
    .number()
    .int()
    .min(18, { message: "Age must be atleast 18" })
    .max(100, { message: "Age must be atmost 100" }),

  avatar: z
    .string()
    .url({ message: "Invalid avatar URL" })
    .max(150, { message: "Avatar URL must be at most 150 characters long" }),

  password: passwordSchema,

  bio: z
    .string()
    .max(200, { message: "Bio must be at most 200 characters long" })
    .optional(),

  gender: z.enum(["male", "female", "other"]).optional(),

  skills: z
    .array(
      z
        .string()
        .max(20, { message: "Skill must be at most 20 characters long" })
    )
    .max(5, { message: "Maximum 5 skills allowed" })
    .optional(),

  hobbies: z
    .array(
      z
        .string()
        .max(20, { message: "Hobbies must be at most 20 characters long" })
    )
    .max(5, { message: "Maximum 5 hobbies allowed" })
    .optional(),

  website: z.string().url().optional(),

  experienceYears: z.number().int().optional(),
});

const userSchema = zodSchema(zUser, { timestamps: true });
userSchema.path("email").unique(true);
userSchema.path("email").immutable(true);
export const User = model("User", userSchema);
