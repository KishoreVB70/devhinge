import { Request, Response } from "express";
import {
  ErrorResponse,
  errorResponse,
  getUserFromRequest,
  isMongoError,
  successResponse,
} from "../utils/utils.js";
import { User } from "../model/user.js";
import { z } from "zod";

export const getUserSelf = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    successResponse(res, "User found", user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    errorResponse(res, 404, "User not found");
  }
};
export const putUser = async (req: Request, res: Response) => {
  try {
    const user = getUserFromRequest(req).toObject();
    const { email, _id, password, ...updateUser } = user;
    console.log(updateUser);
    const result = await User.findOneAndUpdate({ email }, updateUser, {
      new: true,
    });
    if (!result) {
      errorResponse(res, 404, "User not found");
      return;
    }
    successResponse(res, "User updated", result);
  } catch (error) {
    console.error("Error updating user: ", error);
    if (error instanceof z.ZodError) {
      const message = `Validation failed: ${error.errors[0].message}`;
      const errors: ErrorResponse[] = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      errorResponse(res, 400, message, errors);
      return;
    }
    if (isMongoError(error)) {
      errorResponse(
        res,
        400,
        "Invalid user data: " + error.errorResponse.errmsg
      );
      return;
    }
    errorResponse(res, 500, "Internal server error, unable to update user");
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const user = getUserFromRequest(req);
    const result = await user.save();
    console.log(result);
    successResponse(res, "User created", result);
  } catch (error) {
    console.error("Error:", error);

    // Zod validation error
    if (error instanceof z.ZodError) {
      const message = `Validation failed: ${error.errors[0].message}`;
      const errors: ErrorResponse[] = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      errorResponse(res, 400, message, errors);
      return;
    }

    // Handle MongoDB duplicate email error
    if (isMongoError(error) && error.code === 11000) {
      const message = "Email is already in use";
      errorResponse(res, 400, message);
      return;
    }

    // Handle other unexpected errors
    errorResponse(res, 500, "Internal server error, unable to create user");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).send("Internal server error");
  }
};
