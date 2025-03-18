import "server-only";
import demoData from "@/lib/store/demoData.json" assert { type: "json" };
import {
  CONNECTIONS_PER_PAGE,
  INITIAL_PROFILES_PER_PAGE_FEED,
  PROFILES_PER_PAGE_FEED,
} from "@/lib/constants";
import { zConnectedProfiles } from "@/lib/schema/connectionSchema";
import { zFeedProfiles, zUpdatableUser } from "@/lib/schema/userSchema";

export const getFeedProfilesDemo = async (pageParam: string) => {
  const profilesRaw = [
    { id: "1", name: "John", avatar_url: "/devconnect.webp" },
  ];
  const profiles = zFeedProfiles.parse(profilesRaw);
  console.log(INITIAL_PROFILES_PER_PAGE_FEED);
  console.log(PROFILES_PER_PAGE_FEED);
  const nextCursor = pageParam;
  return {
    profiles,
    nextCursor,
  };
};

export const getInterestedProfilesDemo = async (pageParam: string) => {
  const profilesRaw = [
    { id: "1", name: "John", avatar_url: "/devconnect.webp" },
  ];
  const profiles = zFeedProfiles.parse(profilesRaw);
  const nextCursor = pageParam;
  return {
    profiles,
    nextCursor,
  };
};

export const getConnectedProfilesDemo = async (page: number) => {
  console.log(CONNECTIONS_PER_PAGE);
  const dataRaw = [
    {
      id: "1",
      name: "John",
    },
  ];

  const data = zConnectedProfiles.parse(dataRaw);

  return {
    profiles: data,
    nextPage: page,
  };
};

export const getUserDemo = async (id: string) => {
  return { id, name: "John", avatar_url: "/devconnect.webp" };
};

export async function getEditableUserDetailsDemo() {
  const profile = demoData;
  return zUpdatableUser.parse(profile);
}
