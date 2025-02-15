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
    if (!token) throw new Error("Unauthenticated");

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded || typeof decoded === "string" || !decoded.id) {
      throw new Error("Unauthenticated");
    }
    req.body.id = decoded.id;
    next();
  } catch (error) {
    console.error("Error authenticating user: ", error);
    res.status(401).send("Unauthenticated");
  }
}
