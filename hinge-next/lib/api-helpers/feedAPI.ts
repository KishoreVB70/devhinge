import { zUserFeedProfile } from "@/lib/schema/connectionSchema";
import axios from "axios";
export async function getFeedProfilesAPI() {
  console.log("Feed API");
  const response = await axios.get("/api/feed");
  const typedData = zUserFeedProfile.array().parse(response.data);
  console.log("Feed API prefetch response: ", typedData);
  return typedData;
}
