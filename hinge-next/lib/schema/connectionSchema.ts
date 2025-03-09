import { zID } from "@/lib/schema/userSchema";
import { z } from "zod";

const connectionstatusEnum = z.enum([
  "ignored",
  "interested",
  "accepted",
  "rejected",
]);
type ConnectionStatusEnum = z.infer<typeof connectionstatusEnum>;

export type NewConnectionStatus = Extract<
  ConnectionStatusEnum,
  "ignored" | "interested"
>;

export type ModifyConnectionStatus = Extract<
  ConnectionStatusEnum,
  "accepted" | "rejected"
>;

export const zConnection = z.object({
  id: zID,
  sender_id: zID,
  target_id: zID,
  status: connectionstatusEnum,
});

export const zInterestedProfiles = z
  .object({
    id: zID,
    sender_profile: z.object({
      id: zID,
      name: z.string(),
      avatar_url: z.string(),
    }),
  })
  .array();
export type InterestedProfiles = z.infer<typeof zInterestedProfiles>;
