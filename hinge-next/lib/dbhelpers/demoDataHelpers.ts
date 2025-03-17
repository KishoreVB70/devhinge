// TODO: Breakdown each function into small helpers and try to re use
import "server-only";
import {
  CONNECTIONS_PER_PAGE,
  INITIAL_PROFILES_PER_PAGE_FEED,
  PROFILES_PER_PAGE_FEED,
} from "@/lib/constants";

export const getFeedProfilesDemo = async (pageParam: string) => {
  const profiles = [{ id: "1", name: "John", avatar_url: "/devconnect.webp" }];
  console.log(INITIAL_PROFILES_PER_PAGE_FEED);
  console.log(PROFILES_PER_PAGE_FEED);
  const nextCursor = pageParam;
  return {
    profiles,
    nextCursor,
  };
};

export const getInterestedProfilesDemo = async (pageParam: string) => {
  const profiles = [{ id: "1", name: "John", avatar_url: "/devconnect.webp" }];
  const nextCursor = pageParam;
  return {
    profiles,
    nextCursor,
  };
};

export const getConnectedProfilesDemo = async (page: number) => {
  console.log(CONNECTIONS_PER_PAGE);
  const data = [
    {
      id: "1",
      name: "John",
    },
  ];
  return {
    profiles: data,
    nextPage: page,
  };
};

export const getUserDemo = async (id: string) => {
  return { id, name: "John", avatar_url: "/devconnect.webp" };
};

export async function getEditableUserDetailsDemo() {
  return {
    id: "1",
    name: "John",
  };
}
