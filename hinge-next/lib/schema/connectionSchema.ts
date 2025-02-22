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
  id: z.string(),
  sender_id: z.string(),
  target_id: z.string(),
  status: connectionstatusEnum,
});

const zID = z.preprocess((val) => String(val), z.string());

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
