import zodSchema from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";

const connectionstatusEnum = z.enum([
  "ignore",
  "interested",
  "accepted",
  "rejected",
]);

type ConnectionStatusEnum = z.infer<typeof connectionstatusEnum>;
export type NewConnectionStatus = Extract<
  ConnectionStatusEnum,
  "ignore" | "interested"
>;

export type ModifyConnectionStatus = Extract<
  ConnectionStatusEnum,
  "accepted" | "rejected"
>;

const zConnection = z.object({
  senderId: z.string(),
  targetId: z.string(),
  status: connectionstatusEnum,
});

const connectionSchema = zodSchema(zConnection, { timestamps: true });
connectionSchema.index({ senderId: 1, targetId: 1 }, { unique: true });

// Schema level validation for connection creation
connectionSchema.pre("save", async function (next) {
  // 1) Check if the connection already exists
  const existingConnection = await Connection.findOne({
    $or: [
      { senderId: this.senderId, targetId: this.targetId },
      { senderId: this.targetId, targetId: this.senderId },
    ],
  });

  if (existingConnection) {
    return next(new Error("Connection already exists in reverse order"));
  }

  // 2) Check if user doesn't connect to themselves
  if (this.senderId === this.targetId) {
    return next(new Error("User cannot connect to themselves"));
  }

  next();
});

// Schema validation for updating connection status
connectionSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    const query = this.getQuery();

    let newStatus: string | undefined;

    if (!Array.isArray(update)) {
      newStatus = update?.$set?.status || update?.status;
    }

    // Update must be either of "accepted" or "rejected"
    if (!newStatus || newStatus === "interested" || newStatus === "ignore") {
      return next(new Error("Invalid status update"));
    }

    const existingConnection = await this.model.findOne(query);
    if (!existingConnection) {
      return next(new Error("Connection not found"));
    }

    // Existing connection must be in "interested" status to be updated
    if (existingConnection.status !== "interested") {
      return next(
        new Error("Can only accept a connection that is in 'interested' status")
      );
    }

    next();
  } catch (error) {
    next(new Error("Error validating connection update in schema level"));
  }
});

connectionSchema.path("senderId").immutable(true);
connectionSchema.path("targetId").immutable(true);
const Connection = model("Connection", connectionSchema);

export default Connection;
