import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./config/mongoose.js";
import { User, zUser } from "./model/user.js";
import { getUser, postUser, putUser } from "./api/user.js";
import { errorResponse, successResponse } from "./utils/utils.js";
import { fail } from "assert";
import { error } from "console";

const app = express();
const PORT = 3000;

async function main() {
  try {
    console.log("Connecting to database");
    await connectDB();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  app.use(express.json());

  app.get("/feed", async (req, res) => {
    try {
      const feed = await User.aggregate([{ $sample: { size: 10 } }]);
      res.json(feed);
    } catch (error) {
      console.error("Error fetching feed: ", error);
      res.status(500).send("Internal server error");
    }
  });

  app.post("/login", async (req, res) => {
    const loginSchema = zUser.pick({ email: true, password: true });
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const isMatch = await (
        user as unknown as {
          comparePassword: (pwd: string) => Promise<boolean>;
        }
      ).comparePassword(password);

      if (!isMatch) {
        errorResponse(res, 400, "Invalid email or password");
        return;
      }

      successResponse(res, "User logged in", user);
    } catch (error) {
      console.error("Error logging in: ", error);
      errorResponse(res, 400, "Invalid email or password");
    }
  });

  // Get user by email
  app.get("/user/:email", getUser);

  app.post("/user", postUser);

  app.put("/user", putUser);

  // Fallback error handler
  app.use("/", (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  });
}
main();
