import { zConnectedProfilesCursor } from "@/lib/schema/connectionSchema";
import axios from "axios";
export async function getConnectedProfilesAPI(pageParam: number | null) {
  const url = pageParam ? `/api/feed?nextCursor=${pageParam}` : "/api/feed";
  const response = await axios.get(url);
  const typedData = zConnectedProfilesCursor.parse(response.data);
  return typedData;
}
