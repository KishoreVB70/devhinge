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

export const zConnection = z.object({
  id: z.string(),
  sender_id: z.string(),
  target_id: z.string(),
  status: connectionstatusEnum,
});
