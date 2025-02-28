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
  })
  .required();

export const zSignupStepOne = zSignup.pick({
  email: true,
  password: true,
});

const zProfileImage = z
  .instanceof(FileList)
  .refine((files) => files.length === 1, "Please upload a single file.")
  .refine(
    (files) =>
      ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type),
    "Only .jpg, .png, .gif formats are supported."
  );

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
