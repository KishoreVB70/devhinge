import { NextFunction, Request, Response } from "express";
import env from "../utils/envVariables.js";
import jwt from "jsonwebtoken";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Unauthorized");

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET);
    console.log("Decoded: ", decoded);
    if (decoded) {
      next();
    } else throw new Error("Unauthorized");
  } catch (error) {
    console.error("Error authenticating user: ", error);
    res.status(401).send("Unauthorized");
  }
}
