import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetComments = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/blog/fetch/${id}/comments`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
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
