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
connectionSchema.path("senderId").immutable(true);
connectionSchema.path("targetId").immutable(true);
const Connection = model("Connection", connectionSchema);

export default Connection;
