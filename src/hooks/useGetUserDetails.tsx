import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetUser = () => {
  const { data, error, isLoading } = useSWR(
    "/user/auth/self-identification",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    user: data,
    error,
    isLoading,
  };
};

export default useGetUser;
