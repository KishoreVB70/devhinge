import { zUser } from "@/lib/schema/userSchema";
import { z } from "zod";

export const zSignup = zUser
  .pick({
    email: true,
    password: true,
    age: true,
    name: true,
    gender: true,
    gender_preference: true,
    avatar_url: true,
  })
  .required();

export const zSignupStepOne = zSignup.pick({
  email: true,
  password: true,
});

const MAX_FILE_SIZE = 4 * 1024 * 1024;

// Define accepted image MIME types
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const zProfileImage = z
  .instanceof(File)
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Unsupported file type. Only JPEG, PNG, and GIF are allowed.",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size must be less than 5MB.",
  });

export const zSignupStepTwo = zSignup
  .pick({
    name: true,
    age: true,
    gender: true,
    gender_preference: true,
  })
  .extend({
    profileImage: zProfileImage,
  });

export type SignUpInput = z.infer<typeof zSignup>;
