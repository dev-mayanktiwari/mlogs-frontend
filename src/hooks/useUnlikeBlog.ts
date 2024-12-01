import { useState } from "react";
import { unlikePost } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const useUnlikeBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const unlikeBlog = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      await unlikePost(postId);
      toast({
        title: "Success",
        description: "Removed like successfully.",
        variant: "default",
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: "Failed to unlike post. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    unlikeBlog,
    loading,
    error,
  };
};

export default useUnlikeBlog;
