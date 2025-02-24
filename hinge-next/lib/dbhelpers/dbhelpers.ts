import "server-only";
import { supabase } from "@/lib/config/supabase";
import { headers } from "next/headers";
import { zInterestedProfiles } from "@/lib/schema/connectionSchema";
import { z } from "zod";

export const getFeedProfiles = async () => {
  try {
    // 1) Remove self
    // 2) Remove if connection already exists
    const userId = (await headers()).get("id");

    if (!userId) {
      throw new Error("User ID not found");
    }

    const { data: connectionIds, error: usersError } = await supabase
      .from("connections")
      .select(
        `
          sender_id,
          target_id
        `
      )
      .or(`sender_id.eq.${userId},target_id.eq.${userId}`);

    if (usersError) {
      throw new Error(usersError.message);
    }

    // No connections
    if (connectionIds.length === 0) {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, avatar_url");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }

    const filterSet = new Set(
      connectionIds.flatMap(({ sender_id, target_id }) => [
        sender_id,
        target_id,
      ])
    );

    const filterArray = Array.from(filterSet);

    const { data, error } = await supabase
      .from("users")
      .select("id, name, avatar_url")
      .not("id", "in", `(${filterArray.join(",")})`);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getInterestedProfiles = async () => {
  try {
    const header = await headers();
    const userId = header.get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const { data, error } = await supabase
      .from("connections")
      .select(
        `
          id,
          sender_profile:sender_id (id, name, avatar_url)
        `
      )
      .eq("target_id", userId)
      .eq("status", "interested");

    if (error) {
      throw new Error(error.message);
    }

    // Validate the data
    const validatedData = zInterestedProfiles.parse(data);
    if (validatedData.length === 0) {
      return null;
    }
    return validatedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const zConnectionData = z.object({
  id: z.preprocess((val) => String(val), z.string()),
  sender_profile: z.object({
    id: z.preprocess((val) => String(val), z.string()),
    name: z.string(),
    avatar_url: z.string(),
  }),
  target_profile: z.object({
    id: z.preprocess((val) => String(val), z.string()),
    name: z.string(),
    avatar_url: z.string(),
  }),
});

export const getConnectedProfiles = async () => {
  try {
    const header = await headers();
    const userId = header.get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    // TODO: ensure supabase won't return an array -> cause breaking changes
    const { data, error } = await supabase
      .from("connections")
      .select(
        `
          id,
          sender_profile:sender_id (id, name, avatar_url),
          target_profile:target_id (id, name, avatar_url)
        `
      )
      .or(`sender_id.eq.${userId},target_id.eq.${userId}`)
      .eq("status", "accepted");

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return [];
    }

    const typedData = zConnectionData.array().parse(data);

    const cleansedData = typedData.map((item) => {
      return {
        id: item.id,
        profile:
          item.sender_profile.id === userId
            ? item.target_profile
            : item.sender_profile,
      };
    });
    return cleansedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUser = async () => {
  try {
    const { data, error } = await supabase.from("users").select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
