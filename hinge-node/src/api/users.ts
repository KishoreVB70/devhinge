import { Request, Response } from "express";
import {
  ErrorResponse,
  errorResponse,
  getUserFromRequest,
  isMongoError,
  successResponse,
} from "../utils/utils.js";
import {
  User,
  userProfileData,
  userSelfProfileData,
  zUserPatch,
} from "../model/user.js";
import { z } from "zod";

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const user = await User.findById(id).select(userSelfProfileData);
    if (!user) throw new Error("User not found");
    successResponse(res, "User found", user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    if (error instanceof Error) {
      errorResponse(res, 404, error.message);
      return;
    }
    errorResponse(res, 404, "Error fetching user");
  }
};

export const patchUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const updateUserData = zUserPatch.parse(req.body);

    const updatedUser = await User.findByIdAndUpdate(id, updateUserData, {
      new: true,
    });

    if (!updatedUser) throw new Error("User not found");

    successResponse(res, "User updated", updatedUser);
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
    if (error instanceof Error) {
      errorResponse(res, 404, error.message);
      return;
    }
    errorResponse(res, 500, "Internal server error, unable to update user");
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const user = getUserFromRequest(req);
    const result = await user.save();
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

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email }).select(userProfileData);
    if (!user) {
      throw new Error("User not found");
    }
    successResponse(res, "User found", user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    if (error instanceof Error) {
      errorResponse(res, 404, "User not found");
      return;
    }
    errorResponse(res, 404, "Error fetching user");
  }
};
