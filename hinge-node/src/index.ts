import express, { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "./middleware/authenticated.js";
import { connectDB } from "./config/mongoose.js";
import { User } from "./model/user.js";

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

  app.get("/user/:id", isAuthenticated, async (req, res) => {
    console.log("user: ", req.params.id);
    res.send("hi");
  });

  app.post("/user", async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const image = req.body.image;
      const user = new User({
        name,
        email,
        password,
        image,
      });
      const result = await user.save();
      console.log(result);
      res.send("User created");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to create user");
    }
  });

  // Fallback error handler
  app.use("/", (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  });
}
main();
