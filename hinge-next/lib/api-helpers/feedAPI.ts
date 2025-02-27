import { zFeedUserCursor } from "@/lib/schema/userSchema";
import axios from "axios";
export async function getFeedProfilesAPI(pageParam: string | null) {
  const url = pageParam ? `/api/feed?nextCursor=${pageParam}` : "/api/feed";
  const response = await axios.get(url);
  const typedData = zFeedUserCursor.parse(response.data);
  console.log("Feed API prefetch response: ", typedData);
  return typedData;
}
