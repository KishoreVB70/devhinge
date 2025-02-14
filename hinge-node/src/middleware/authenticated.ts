import { NextFunction, Request, Response } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.params.id) {
    next();
  }
  res.status(401).send("Unauthorized");
}
