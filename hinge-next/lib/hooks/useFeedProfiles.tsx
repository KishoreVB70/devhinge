import { getFeedProfilesAPI } from "@/lib/api-helpers/feedAPI";
import { FeedUser } from "@/lib/schema/userSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useFeedProfiles(initialProfiles: FeedUser) {
  const queryClient = useQueryClient();
  const prefetch = () => {
    console.log("Prefetching queries");
    queryClient.prefetchQuery({
      queryKey: ["feedProfiles"],
      queryFn: async () => await getFeedProfilesAPI(),
    });
  };

  const mergeQuery = () => {
    console.log("Merging queries");
    const prefetchedProfiles = queryClient.getQueryData(["feedProfiles"]);
    console.log("Prefetched queries", prefetchedProfiles);
    queryClient.setQueryData(["feedProfiles"], prefetchedProfiles);
  };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["feedProfiles"],
    queryFn: async () => await getFeedProfilesAPI(),
    initialData: initialProfiles,
    enabled: !initialProfiles,
  });

  return { data, isError, isLoading, prefetch, mergeQuery };
}
