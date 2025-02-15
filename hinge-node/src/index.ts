import express, { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "./middleware/authenticated.js";

const app = express();
const PORT = 3000;
const user = {
  name: "puffy",
  email: "puffy@dev",
  image: "asdf",
  password: "puffy@123",
};

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/user/:id", isAuthenticated, (req, res) => {
  console.log("user: ", req.params.id);
  res.send(user);
});
app.post("/user", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  res.send("User created");
});

// Fallback error handler
app.use("/", (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});
