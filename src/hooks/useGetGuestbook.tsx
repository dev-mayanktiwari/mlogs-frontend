import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetGuestbook = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/blog/fetch/get-guestbook`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  return {
    guestbook: data,
    error,
    isLoading,
    mutate,
  };
};

export default useGetGuestbook;
