import { Request, Response } from "express";
import { getUserFromRequest } from "../utils/utils.js";
import { User } from "../model/user.js";

export const postUser = async (req: Request, res: Response) => {
  try {
    const user = getUserFromRequest(req);
    const result = await user.save();
    console.log(result);
    res.send("User created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create user");
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
