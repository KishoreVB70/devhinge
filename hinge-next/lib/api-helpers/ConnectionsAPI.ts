import { zConnectedProfilesCursor } from "@/lib/schema/connectionSchema";
import axios from "axios";
export async function getConnectedProfilesAPI(
  pageParam: number,
  isDemo: boolean
) {
  const url = `/api/connections?nextPage=${pageParam}&isDemo=${isDemo}`;
  const response = await axios.get(url);
  const typedData = zConnectedProfilesCursor.parse(response.data);
  return typedData;
}
