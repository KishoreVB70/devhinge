import { User, zUser } from "../model/user.js";
import { errorResponse, successResponse } from "../utils/utils.js";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const loginSchema = zUser.pick({ email: true, password: true });
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
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

    res.cookie("token", token, { httpOnly: true });
    successResponse(res, "User logged in", user);
  } catch (error) {
    console.error("Error logging in: ", error);
    errorResponse(res, 400, "Invalid credentials");
  }
}
