import { useState } from "react";
import { likePost } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const useLikeBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const likeBlog = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      await likePost(postId);
      toast({
        title: "Success",
        description: "Comment posted successfully.",
        variant: "default",
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    likeBlog,
    loading,
    error,
  };
};

export default useLikeBlog;