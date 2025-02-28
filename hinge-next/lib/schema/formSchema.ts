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

export const zSignupStepTwo = zSignup.pick({
  name: true,
  age: true,
  gender: true,
  gender_preference: true,
});

export type CustomSigunpInput = z.infer<typeof zSignup>;
