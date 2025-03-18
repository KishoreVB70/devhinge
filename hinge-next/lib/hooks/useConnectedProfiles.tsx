import { getConnectedProfilesAPI } from "@/lib/api-helpers/ConnectionsAPI";
import { useDemoStore } from "@/lib/store/useDemoStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useConnectedProfiles() {
  const { isDemo } = useDemoStore();
  const queryKey = isDemo ? ["connectedProfilesDemo"] : ["connectedProfiles"];
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) =>
      getConnectedProfilesAPI(pageParam, isDemo ? true : false),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isDemo !== undefined,
  });
}
