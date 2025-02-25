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

    const prefetchedProfiles =
      queryClient.getQueryData<FeedUser>(["profiles"]) || [];
    const currentQueryData =
      queryClient.getQueryData<FeedUser>(["feedProfiles"]) || [];

    const existingIds = new Set(currentQueryData.map((profile) => profile.id));
    console.log(existingIds);
    const arrayer = Array.from(existingIds);
    console.log("Array", arrayer);

    const uniquePrefetchedProfiles = prefetchedProfiles.filter((profile) => {
      const newer = !existingIds.has(String(profile.id));
      console.log("The answer for id" + profile.id + "is" + newer);
      return newer;
    });

    console.log("Unique profiles", uniquePrefetchedProfiles);

    queryClient.setQueryData(["feedProfiles"], uniquePrefetchedProfiles);
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
