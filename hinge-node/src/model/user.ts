import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";
import { extendZod } from "@zodyac/zod-mongoose";
import { MAX_HOBBIES, MAX_SKILLS } from "../utils/constants.js";

extendZod(z);

const passwordSchema = z
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

export const zUser = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(18, { message: "Name must be at most 18 characters long" })
    .regex(/^\S+$/, { message: "Name must not contain spaces" }),

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
        .max(25, { message: "Skill must be at most 25 characters long" })
    )
    .max(MAX_SKILLS, { message: `Maximum ${MAX_SKILLS} skills allowed` })
    .optional(),

  hobbies: z
    .array(
      z
        .string()
        .max(25, { message: "Hobbies must be at most 25 characters long" })
    )
    .max(MAX_HOBBIES, { message: `Maximum ${MAX_HOBBIES} hobbies allowed` })
    .optional(),

  website: z.string().url().optional(),

  experienceYears: z.number().int().optional(),
});

const userSchema = zodSchema(zUser, { timestamps: true });
userSchema.path("email").unique(true);
userSchema.path("email").immutable(true);
userSchema.path("password").immutable(true);
export const User = model("User", userSchema);
