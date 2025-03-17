import { zFeedProfileCursor } from "@/lib/schema/userSchema";

export async function getInterestedProfilesAPI(cursor: string) {
  const res = await fetch(`/api/interested-profiles?cursor=${cursor}`);
  const data = await res.json();
  const typedData = zFeedProfileCursor.parse(data);
  return typedData;
}
