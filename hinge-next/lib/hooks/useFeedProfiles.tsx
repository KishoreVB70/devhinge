import { getFeedProfilesAPI } from "@/lib/api-helpers/feedAPI";
import { FeedUser } from "@/lib/schema/userSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useFeedProfiles(initialProfiles: FeedUser) {
  const queryClient = useQueryClient();
  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["profiles"],
      queryFn: async () => await getFeedProfilesAPI(),
    });
  };

  const mergeQuery = () => {
    const prefetchedProfiles =
      queryClient.getQueryData<FeedUser>(["profiles"]) || [];
    const currentQueryData =
      queryClient.getQueryData<FeedUser>(["feedProfiles"]) || [];

    const existingIds = new Set(currentQueryData.map((profile) => profile.id));

    // Make sure no data is duplicated
    const uniquePrefetchedProfiles = prefetchedProfiles.filter(
      (profile) => !existingIds.has(profile.id)
    );

    queryClient.setQueryData(["feedProfiles"], uniquePrefetchedProfiles);
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
