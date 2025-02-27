import { getFeedProfilesAPI } from "@/lib/api-helpers/feedAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useFeedProfiles() {
  return useInfiniteQuery({
    queryKey: ["feedProfiles"],
    queryFn: ({ pageParam }) => getFeedProfilesAPI(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
