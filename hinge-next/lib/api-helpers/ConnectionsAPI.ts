import { zConnectedProfilesCursor } from "@/lib/schema/connectionSchema";
import axios from "axios";
export async function getConnectedProfilesAPI(pageParam: number) {
  const url = pageParam
    ? `/api/connections?nextPage=${pageParam}`
    : "/api/connections";
  const response = await axios.get(url);
  const typedData = zConnectedProfilesCursor.parse(response.data);
  return typedData;
}
