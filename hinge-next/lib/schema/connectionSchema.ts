import { zFeedProfile, zID, zSimpleProfile } from "@/lib/schema/userSchema";
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

export const zConnectedProfiles = z
  .object({
    id: zID,
    sender_profile: zFeedProfile,
  })
  .array();
export type ConnectedProfiles = z.infer<typeof zConnectedProfiles>;

export const zConnectedProfilesCursor = z.object({
  profiles: zSimpleProfile.array(),
  nextPage: z.number().optional(),
});
export type ConnectedProfilesCursor = z.infer<typeof zConnectedProfilesCursor>;
