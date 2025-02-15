import { Request, Response } from "express";
import { User, zUser } from "../model/user.js";

export type ErrorResponse = {
  field: string;
  message: string;
};
export const errorResponse = (
  res: Response,
  status: number,
  message: string,
  errors: ErrorResponse[] = []
) => {
  res.status(status).json({ success: false, message, errors });
};

export const successResponse = (
  res: Response,
  message: string,
  data: any = null
) => {
  res.status(200).json({ success: true, message, data });
};

export const getUserFromRequest = (req: Request) => {
  const validatedUser = zUser.parse(req.body);
  return new User(validatedUser);
};

export const isMongoError = (error: unknown): error is { code: number } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as any).code === "number"
  );
};
