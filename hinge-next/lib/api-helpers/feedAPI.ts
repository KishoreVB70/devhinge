import { zUserFeedProfile } from "@/lib/schema/connectionSchema";
import axios from "axios";
export async function getFeedProfilesAPI() {
  const response = await axios.get("/api/feed");
  const typedData = zUserFeedProfile.array().parse(response.data);
  return typedData;
}
