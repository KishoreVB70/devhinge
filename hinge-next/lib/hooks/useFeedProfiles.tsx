import { getFeedProfilesAPI } from "@/lib/api-helpers/feedAPI";
import { FeedUser } from "@/lib/schema/userSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useFeedProfiles(initialProfiles: FeedUser) {
  const queryClient = useQueryClient();
  const prefetch = () => {
    console.log("Prefetching queries");
    queryClient.prefetchQuery({
      queryKey: ["profiles"],
      queryFn: async () => await getFeedProfilesAPI(),
    });
  };

  const mergeQuery = () => {
    console.log("Merging queries");
    const prefetchedProfiles = queryClient.getQueryData(["profiles"]);
    console.log("Prefetched queries", prefetchedProfiles);
    queryClient.setQueryData(["feedProfiles"], prefetchedProfiles);
    console.log("Updated queries", queryClient.getQueryData(["feedProfiles"]));
  };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["feedProfiles"],
    queryFn: async () => await getFeedProfilesAPI(),
    initialData: initialProfiles,
    enabled: !initialProfiles,
    staleTime: Infinity,
  });

  return { data, isError, isLoading, prefetch, mergeQuery };
}
