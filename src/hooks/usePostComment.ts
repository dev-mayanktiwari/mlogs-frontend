import { useState } from "react";
import { postComment as postCommentAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const usePostComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const postComment = async (postId: string, text: string) => {
    setLoading(true);
    setError(null);
    try {
      const newComment = await postCommentAPI(postId, text);
      toast({
        title: "Success",
        duration: 5000,
        description: "Comment posted successfully.",
        variant: "default",
      });
      return newComment;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        duration: 5000,
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    postComment,
    loading,
    error,
  };
};

export default usePostComment;
