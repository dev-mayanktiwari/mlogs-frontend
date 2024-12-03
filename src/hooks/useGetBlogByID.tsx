import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetBlogByID = (id: string) => {
  const { data, error, isLoading } = useSWR(`/blog/fetch/${id}/blog`, fetcher, {
    revalidateIfStale: false,
    dedupingInterval: 60 * 60 * 1000,
  });
  
  return {
    post: data,
    error,
    isLoading,
  };
};

export default useGetBlogByID;
