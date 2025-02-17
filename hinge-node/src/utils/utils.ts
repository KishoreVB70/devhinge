import { Request, Response } from "express";
import { User, zUser } from "../model/user.js";

export async function userExists(userId: string | null) {
  const user = await User.findById(userId);
  if (!user) throw new Error("user not found");
}

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

type MongoError = {
  code: number;
  errorResponse: {
    errmsg: string;
  };
};
export const isMongoError = (error: unknown): error is MongoError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as any).code === "number" &&
    "errorResponse" in error &&
    typeof (error as any).errorResponse === "object" &&
    "errmsg" in (error as any).errorResponse &&
    typeof (error as any).errorResponse.errmsg === "string"
  );
};
