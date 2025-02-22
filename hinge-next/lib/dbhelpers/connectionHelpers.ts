import "server-only";
import { supabase } from "@/lib/config/supabase";
import {
  ModifyConnectionStatus,
  NewConnectionStatus,
} from "@/lib/schema/connectionSchema";

// Helper functions
async function userExists(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();
  if (error) {
    throw new Error(`Error Querying DB: ${error.message}`);
  }
  if (!data) {
    throw new Error("User not found");
  }
}
async function newConnectionValidation(senderId: string, targetId: string) {
  // 1) Validate target id
  // Note: Sender would be automatically valid since passed through middleware
  await userExists(targetId);

  // 2) Check if Connection already Exists
  const { data: connectionData, error } = await supabase
    .from("connections")
    .select("id")
    .or(
      `and(senderId.eq.${senderId},targetId.eq.${targetId}),and(senderId.eq.${targetId},targetId.eq.${senderId})`
    );

  if (connectionData || error) {
    throw new Error("Connection already exists");
  }

  // 3) Check if user doesn't connect to themselves
  if (senderId === targetId) {
    throw new Error("User cannot connect to themselves");
  }
}
export async function createNewConnection(
  sender_id: string,
  target_id: string,
  status: NewConnectionStatus
) {
  await newConnectionValidation(sender_id, target_id);
  console.log(sender_id, target_id);
  const { error } = await supabase
    .from("connections")
    .insert({ sender_id, target_id, status });
  if (error) {
    throw new Error(error.message);
  }
}

async function modifyConnectionValidation(senderId: string, targetId: string) {
  // 1) Make sure the initial sender is an actual user id
  await userExists(senderId);

  // 2) Check whether Connection exists in "interested" status
  // Here, sender is the initial "interested" sender
  const { data, error } = await supabase
    .from("connections")
    .select("id")
    .eq("sender_id", senderId)
    .eq("target_id", targetId)
    .eq("status", "interested")
    .single();

  if (error) {
    throw new Error(`Error Querying DB: ${error.message}`);
  }
  if (!data) {
    throw new Error("Connection not found");
  }
}
export async function modifyConnection(
  senderID: string,
  targetID: string,
  status: ModifyConnectionStatus
) {
  // NOTE:  Inverse senderId and targetId for the initial "interested" sender
  const senderId = targetID;
  const targetId = senderID;

  await modifyConnectionValidation(senderId, targetId);
  const { data, error } = await supabase
    .from("connections")
    .update({ status })
    .eq("sender_id", senderId)
    .eq("target_id", targetId)
    .eq("status", "interested");
  if (error) {
    throw new Error(`Error Querying DB: ${error.message}`);
  }
  if (!data) {
    throw new Error("Connection not found");
  }
}
