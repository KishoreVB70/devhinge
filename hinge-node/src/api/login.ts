import { User, zUser } from "../model/user.js";
import { errorResponse, successResponse } from "../utils/utils.js";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const loginSchema = zUser.pick({ email: true, password: true });
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("Invalid credentials");
      return;
    }

    const isMatch = await (
      user as unknown as {
        comparePassword: (pwd: string) => Promise<boolean>;
      }
    ).comparePassword(password);

    if (!isMatch) {
      errorResponse(res, 400, "Invalid credentials");
      return;
    }

    successResponse(res, "User logged in", user);
  } catch (error) {
    console.error("Error logging in: ", error);
    errorResponse(res, 400, "Invalid credentials");
  }
}
