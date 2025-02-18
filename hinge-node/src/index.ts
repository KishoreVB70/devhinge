import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./config/mongoose.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

import { authentication } from "./middleware/authenticated.js";
import Connection from "./model/connection.js";
import mongoose from "mongoose";
import { User } from "./model/user.js";
import { successResponse } from "./utils/utils.js";

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

  app.use("/", authRouter);
  app.use("/", userRouter);

  app.get("/feed", authentication, async (req, res) => {
    const userId = req.body.id;
    try {
      /*
       *Users Not to be displayed:
       * 1. The user itself
       * 2. Users who are already connected
       * 3. Users to whom the user has sent a connection request
       * 4. Users who have ignored the user
       * 5. Users who have rejected the user's connection request
       */
      /*
       *Users to be displayed:
       * 1. Users who have sent a connection request to the user
       * 2. Users who have doesn't have any connection to the user
       */
      const HiddenConnections = await Connection.find({
        $or: [{ senderId: userId }, { targetId: userId }],
      })
        .lean()
        .select("senderId targetId status");

      const hiddenUsers = new Set<string>();
      const interestedUsers: string[] = [];
      HiddenConnections.forEach((connection) => {
        if (
          connection.status === "interested" &&
          connection.targetId.toString() === userId
        ) {
          interestedUsers.push(connection.senderId.toString());
        } else {
          hiddenUsers.add(connection.senderId.toString());
          hiddenUsers.add(connection.targetId.toString());
        }
      });

      const feed = await User.aggregate([
        {
          $match: {
            _id: { $nin: [...hiddenUsers] }, // Exclude hidden users
          },
        },
        {
          $addFields: {
            isInterested: {
              $cond: {
                if: { $in: ["$_id", interestedUsers] },
                then: 1,
                else: 0,
              }, // Field to prioritize "interested" users
            },
          },
        },
        {
          $sort: {
            isInterested: -1,
            _id: 1,
          },
        },
        {
          $project: {
            isInterested: 0, // Remove isInterested field from the result
          },
        },
      ]);

      if (!feed) {
        return successResponse(res, "No users found", []);
      }

      successResponse(res, "Feed fetched", feed);
    } catch (error) {
      console.error("Error fetching feed: ", error);
      res.status(500).send("Internal server error");
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
