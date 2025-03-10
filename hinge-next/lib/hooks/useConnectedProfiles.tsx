import { getConnectedProfilesAPI } from "@/lib/api-helpers/ConnectionsAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useConnectedProfiles() {
  return useInfiniteQuery({
    queryFn: () => getConnectedProfilesAPI(0),
    queryKey: ["connectedProfiles"],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
