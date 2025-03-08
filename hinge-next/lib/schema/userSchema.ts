import {
  MAX_BIO_LENGTH,
  MAX_HOBBIES,
  MAX_SKILLS,
  MAX_WEBSITE_LENGTH,
} from "@/lib/constants";
import { z } from "zod";

export const zGender = z.enum(["male", "female", "other"]);

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

  password: passwordSchema,

  age: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int()
      .min(10, { message: "Age must be atleast 18" })
      .max(100, { message: "Age must be atmost 100" })
  ),

  avatar_url: z
    .string()
    .url({ message: "Invalid avatar URL" })
    .max(150, { message: "Avatar URL must be at most 150 characters long" }),

  gender: zGender,

  gender_preference: z.array(zGender).min(1, "Select at least one option"),

  bio: z
    .string()
    .max(MAX_BIO_LENGTH, { message: "Bio must be at most 200 characters long" })
    .optional(),

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

  website: z.string().url().max(MAX_WEBSITE_LENGTH).optional(),

  experience_years: z
    .preprocess((val) => Number(val), z.number().int().nonnegative().max(50))
    .optional(),
});

export const zUserPageProfile = zUser
  .omit({
    email: true,
    password: true,
  })
  .extend({
    bio: zUser.shape.bio.nullable(),
    skills: zUser.shape.skills.nullable(),
    hobbies: zUser.shape.hobbies.nullable(),
    experience_years: zUser.shape.experience_years.nullable(),
    website: zUser.shape.website.nullable(),
  });

export const zUpdatableUser = zUserPageProfile.omit({
  name: true,
});

export type UpdatableUser = z.infer<typeof zUpdatableUser>;

export const zUserFeedProfiles = zUser
  .pick({
    name: true,
    avatar_url: true,
    // age: true,
    // gender: true,
  })
  .required()
  .extend({
    id: z.preprocess((val) => String(val), z.string()),
  })
  .array();

export type FeedUser = z.infer<typeof zUserFeedProfiles>;

export const zFeedUserCursor = z.object({
  profiles: zUserFeedProfiles,
  nextCursor: z.string().nullable(),
});

export type FeedUserCursor = z.infer<typeof zFeedUserCursor>;
export type UserCardProfile = { name: string; avatar_url: string };
export type UserProfile = UserCardProfile & { id: string };
export const genderOptions = Object.values(zGender.Values);
