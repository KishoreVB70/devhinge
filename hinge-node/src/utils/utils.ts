import { Request } from "express";
import { User } from "../model/user.js";

export const getUserFromRequest = (req: Request) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const image = req.body.image;
  if (!name || !email || !password || !image) {
    throw new Error("Invalid user data");
  }

  const user = new User({
    name,
    email,
    password,
    image,
  });
  return user;
};
