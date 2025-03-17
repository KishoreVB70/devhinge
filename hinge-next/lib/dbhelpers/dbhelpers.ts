// TODO: Breakdown each function into small helpers and try to re use
import "server-only";
import { supabase } from "@/lib/config/supabase";
import { headers } from "next/headers";
import { z } from "zod";
import {
  zFeedProfile,
  zFeedProfiles,
  zGender,
  zSimpleProfile,
  zUpdatableUser,
} from "@/lib/schema/userSchema";
import {
  CONNECTIONS_PER_PAGE,
  INITIAL_PROFILES_PER_PAGE_FEED,
  PROFILES_PER_PAGE_FEED,
} from "@/lib/constants";
const getConnectionsFilter = async (userId: string) => {
  const { data, error } = await supabase
    .from("connections")
    .select(
      `
          sender_id,
          target_id
        `
    )
    .or(`sender_id.eq.${userId},target_id.eq.${userId}`);

  if (error) {
    throw new Error(error.message);
  }

  // No connections
  if (!data || data.length === 0) {
    return [`${userId}`];
  }

  const filterSet = new Set(
    data.flatMap(({ sender_id, target_id }) => [sender_id, target_id])
  );

  return Array.from(filterSet);
};

export const getFeedProfiles = async (pageParam: string) => {
  const userId = (await headers()).get("id");

  if (!userId) {
    throw new Error("User ID not found");
  }

  // 1) obtain connections of the user
  const filterArray = await getConnectionsFilter(userId);

  // 1) Get gender preference
  const { data: preferenceData, error: preferenceError } = await supabase
    .from("users")
    .select("gender_preference")
    .eq("id", userId)
    .single();

  if (preferenceError) {
    throw new Error(preferenceError.message);
  }

  const genderPreference = preferenceData?.gender_preference
    ? zGender.array().parse(preferenceData.gender_preference)
    : [];

  const isPrefetchQuery = pageParam === "0";

  const pageSize = isPrefetchQuery
    ? INITIAL_PROFILES_PER_PAGE_FEED
    : PROFILES_PER_PAGE_FEED;

  const query = supabase
    .from("users")
    .select("*")
    .not("id", "in", `(${filterArray.join(",")})`)
    .order("id", { ascending: true })
    .limit(pageSize + 1);

  if (!isPrefetchQuery) {
    query.gt("id", pageParam);
  }

  if (genderPreference.length > 0) {
    query.in("gender", genderPreference);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  const typedData = zFeedProfiles.parse(data);

  const hasNextPage = typedData.length > pageSize;
  const profiles = hasNextPage ? typedData.slice(0, pageSize) : typedData;
  const nextCursor = hasNextPage ? typedData[pageSize - 1].id : null;

  return {
    profiles,
    nextCursor,
  };
};

export const getInterestedProfiles = async (pageParam: string) => {
  try {
    const header = await headers();
    const userId = header.get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const isPrefetchQuery = pageParam === "0";
    const pageSize = isPrefetchQuery
      ? INITIAL_PROFILES_PER_PAGE_FEED
      : PROFILES_PER_PAGE_FEED;

    const query = supabase
      .from("connections")
      .select("sender_profile:sender_id (*)")
      .eq("target_id", userId)
      .eq("status", "interested")
      .order("id", { ascending: true })
      .limit(pageSize + 1);

    if (!isPrefetchQuery) {
      query.gt("id", pageParam);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const senderProfiles = data?.map((row) => row.sender_profile) || [];

    const typedData = zFeedProfiles.parse(senderProfiles);

    const hasNextPage = typedData.length > pageSize;
    const profiles = hasNextPage ? typedData.slice(0, pageSize) : typedData;
    const nextCursor = hasNextPage ? typedData[pageSize - 1].id : null;

    return {
      profiles,
      nextCursor,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getConnectedProfiles = async (page: number) => {
  try {
    const header = await headers();
    const userId = header.get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const from = (page - 1) * CONNECTIONS_PER_PAGE;
    const to = from + CONNECTIONS_PER_PAGE;

    const { data, error } = await supabase
      .from("connections")
      .select(
        `
          sender_profile:sender_id (id, name, avatar_url),
          target_profile:target_id (id, name, avatar_url)
        `
      )
      .or(`sender_id.eq.${userId},target_id.eq.${userId}`)
      .eq("status", "accepted")
      .range(from, to);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return null;
    }

    const parser = z.object({
      sender_profile: zSimpleProfile,
      target_profile: zSimpleProfile,
    });

    const parsedData = parser.array().parse(data);

    // Remove self profile from the list
    const cleansedData = parsedData.map((item) => {
      if (item.sender_profile.id === userId) {
        {
          return item.target_profile;
        }
      } else {
        return item.sender_profile;
      }
    });

    let nextPage = undefined;
    if (cleansedData.length > CONNECTIONS_PER_PAGE) {
      nextPage = page + 1;
      cleansedData.pop();
    }
    return {
      profiles: cleansedData,
      nextPage: nextPage,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserSelf = async () => {
  try {
    const userId = (await headers()).get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }
    const zuser = z.object({
      name: z.string(),
      avatar_url: z.string(),
    });
    const { data, error } = await supabase
      .from("users")
      .select("name, avatar_url")
      .eq("id", userId);
    if (error) {
      throw new Error(error.message);
    }

    return zuser.parse(data[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUser = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return zFeedProfile.parse(data[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getEditableUserDetails() {
  try {
    const userId = (await headers()).get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return zUpdatableUser.parse(data[0]);
  } catch (error) {
    console.error(error);
    return null;
  }
}
