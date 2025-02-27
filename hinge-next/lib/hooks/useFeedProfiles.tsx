import { getFeedProfilesAPI } from "@/lib/api-helpers/feedAPI";
import { FeedUserCursor } from "@/lib/schema/userSchema";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useFeedProfiles() {
  return useInfiniteQuery<
    FeedUserCursor,
    Error,
    FeedUserCursor,
    string[],
    string | null
  >({
    queryKey: ["feedProfiles"],
    queryFn: ({ pageParam }) => getFeedProfilesAPI(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
