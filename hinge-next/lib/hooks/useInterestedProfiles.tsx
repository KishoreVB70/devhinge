import { getInterestedProfilesAPI } from "@/lib/api-helpers/interestedProfilesAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInterestedProfiles() {
  return useInfiniteQuery({
    queryKey: ["interestedProfiles"],
    queryFn: ({ pageParam }) => getInterestedProfilesAPI(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
