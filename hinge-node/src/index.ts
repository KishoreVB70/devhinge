import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./config/mongoose.js";
import { User } from "./model/user.js";
import cookieParser from "cookie-parser";
import { getUser, getUserSelf, postUser, patchUser } from "./api/user.js";
import { login } from "./api/login.js";
import { authentication } from "./middleware/authenticated.js";

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
  app.use(cookieParser());

  app.get("/feed", authentication, async (req, res) => {
    try {
      const feed = await User.aggregate([{ $sample: { size: 10 } }]);
      res.json(feed);
    } catch (error) {
      console.error("Error fetching feed: ", error);
      res.status(500).send("Internal server error");
    }
  });

  app.post("/login", login);

  // Get user by email
  app.get("/user/:email", authentication, getUser);

  // Get self profile
  app.get("/user", authentication, getUserSelf);

  app.post("/user", postUser);

  app.patch("/user", authentication, patchUser);

  // Fallback error handler
  app.use("/", (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  });
}
main();
