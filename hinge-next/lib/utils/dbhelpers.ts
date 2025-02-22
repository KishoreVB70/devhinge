import "server-only";
import { supabase } from "@/lib/config/supabase";
import { headers } from "next/headers";

export const likeProfile = async (targetId: string) => {
  try {
    // 1) obtain senderid
    const header = await headers();
    const senderId = header.get("id");
    if (!senderId) {
      throw new Error("Sender not found");
    }

    // 2) Validate presence of sender and target

    // 2 a) Validate sender
    const { error: senderError } = await supabase
      .from("users")
      .select("id")
      .eq("id", senderId);

    if (senderError) {
      throw new Error("Sender not found");
    }

    // 2 b) Validate target
    const { error: targetError } = await supabase
      .from("users")
      .select("id")
      .eq("id", targetId);

    if (targetError) {
      throw new Error("Target not found");
    }

    // 3) Validate connection already exists
    const { data: connectionData } = await supabase
      .from("connections")
      .select("id")
      .or(
        `and(senderId.eq.${senderId},targetId.eq.${targetId}),and(senderId.eq.${targetId},targetId.eq.${senderId})`
      );

    if (connectionData) {
      throw new Error("Connection already exists");
    }

    const { data, error } = await supabase.from("likes").select();
    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFeedProfile = async () => {
  try {
    const { data, error } = await supabase.from("profiles").select();
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  try {
    const { data, error } = await supabase.from("users").select();
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
