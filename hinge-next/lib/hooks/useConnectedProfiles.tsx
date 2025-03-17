import { getConnectedProfilesAPI } from "@/lib/api-helpers/ConnectionsAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useConnectedProfiles() {
  return useInfiniteQuery({
    queryKey: ["connectedProfiles"],
    queryFn: ({ pageParam }) => getConnectedProfilesAPI(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
