import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetUser = () => {
  const { data, error, isLoading } = useSWR(
    "/user/auth/self-identification",
    fetcher,
    {
      revalidateIfStale: false,
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  return {
    user: data,
    error,
    isLoading,
  };
};

export default useGetUser;
