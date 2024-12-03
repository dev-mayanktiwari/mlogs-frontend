import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetComments = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/blog/fetch/${id}/comments`,
    fetcher,
    {
      revalidateIfStale: false,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  return {
    comments: data,
    error,
    isLoading,
    mutate,
  };
};

export default useGetComments;
