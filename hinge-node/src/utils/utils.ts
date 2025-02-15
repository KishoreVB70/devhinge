import { Request } from "express";
import { User, zUser } from "../model/user.js";

export const getUserFromRequest = (req: Request) => {
  try {
    const validatedUser = zUser.parse(req.body);
    return new User(validatedUser);
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create user");
  }
};
