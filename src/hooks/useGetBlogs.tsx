import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetBlogs = () => {
  const { data, error, isLoading } = useSWR(
    "/blog/fetch/blogs?key=&cat=",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    posts: data,
    error,
    isLoading,
  };
};

export default useGetBlogs;
