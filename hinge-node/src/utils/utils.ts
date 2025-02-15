import { Request } from "express";
import { User, zUser } from "../model/user.js";
import { z } from "zod";

export const getUserFromRequest = (req: Request) => {
  try {
    const validatedUser = zUser.parse(req.body);
    return new User(validatedUser);
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${JSON.stringify(error.errors)}`);
    } else {
      throw new Error("Unable to create user");
    }
  }
};
