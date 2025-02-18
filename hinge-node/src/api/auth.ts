import { User, zUser } from "../model/user.js";
import { errorResponse, successResponse } from "../utils/utils.js";
import { Request, Response } from "express";

export async function changePassword(req: Request, res: Response) {
  try {
    const id = req.body.id;
    const password = req.body.password;

    // Validate password
    const passwordSchema = zUser.pick({ password: true });
    const validatedPasword = passwordSchema.parse({ password });

    // Update password
    const user = await User.findByIdAndUpdate(id, validatedPasword, {
      new: true,
    });

    if (!user) throw new Error("User not found");
  } catch (error) {
    console.error("Error changing password: ", error);
    if (error instanceof Error) {
      return errorResponse(res, 400, error.message);
    }
    errorResponse(res, 500, "Unable to change password");
  }
}

export async function login(req: Request, res: Response) {
  const loginSchema = zUser.pick({ email: true, password: true });
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email }).select("name email password");

    if (!user) throw new Error("User not found");

    const isMatch = await (
      user as unknown as {
        comparePassword: (pwd: string) => Promise<boolean>;
      }
    ).comparePassword(password);

    if (!isMatch) throw new Error("Invalid Password");

    const token = (
      user as unknown as {
        getJwt: () => string;
      }
    ).getJwt();

    const { password: storedPass, ...userInfo } = user.toObject();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict", // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiry
    });

    successResponse(res, "User logged in", userInfo);
  } catch (error) {
    console.error("Error logging in: ", error);
    if (error instanceof Error) {
      errorResponse(res, 400, error.message);
      return;
    }
    errorResponse(res, 400, "Invalid credentials");
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  successResponse(res, "User logged out");
}
