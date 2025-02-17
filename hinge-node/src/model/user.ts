import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";
import { extendZod } from "@zodyac/zod-mongoose";
import { MAX_HOBBIES, MAX_SKILLS } from "../utils/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../utils/envVariables.js";

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

export const zUserPatch = zUser
  .pick({
    name: true,
    age: true,
    avatar: true,
    website: true,
    gender: true,
    bio: true,
    skills: true,
    hobbies: true,
    experienceYears: true,
  })
  .partial(); // Makes all fields optional

const userSchema = zodSchema(zUser, { timestamps: true });
userSchema.path("email").unique(true);
userSchema.path("email").immutable(true);

// Password related checks

userSchema.pre("save", async function (next) {
  // Skip hashing if password is unchanged
  if (!this.isModified("password")) return next();
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    console.error("Error hashing password: ", error);
    next(new Error("Error hashing password"));
  }
});

userSchema.methods.signJwt = function () {
  return jwt.sign({ id: this._id }, env.JWT_SECRET);
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);
