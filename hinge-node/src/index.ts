import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./config/mongoose.js";
import { User } from "./model/user.js";
import { getUser, postUser, putUser } from "./api/user.js";

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
