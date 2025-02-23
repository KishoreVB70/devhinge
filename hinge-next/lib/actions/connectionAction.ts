"use server";
import {
  createNewConnection,
  modifyConnection,
} from "@/lib/dbhelpers/connectionHelpers";
import {
  ModifyConnectionStatus,
  NewConnectionStatus,
} from "@/lib/schema/connectionSchema";
import { headers } from "next/headers";
import "server-only";

export async function likeorPassAction(
  targetId: string,
  status: NewConnectionStatus
) {
  try {
    // 1) obtain senderid
    const header = await headers();
    const senderId = header.get("id");
    console.log(senderId);
    if (!senderId) {
      throw new Error("Sender not found");
    }
    await createNewConnection(senderId, targetId, status);
  } catch (error) {
    console.error(error);
  }
}

export async function modifyConnectionAction(
  targetId: string,
  status: ModifyConnectionStatus
) {
  try {
    // 1) obtain senderid
    const header = await headers();
    const senderId = header.get("id");
    if (!senderId) {
      throw new Error("Sender not found");
    }
    await modifyConnection(senderId, targetId, status);
  } catch (error) {
    console.error(error);
  }
}
