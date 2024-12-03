import { useState } from "react";
import { updateComment as updateCommentAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const useUpdateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const updateComment = async (commentId: string, text: string) => {
    setLoading(true);
    setError(null);
    try {
      const newComment = await updateCommentAPI(commentId, text);
      toast({
        title: "Success",
        duration: 5000,
        description: "Comment updated successfully.",
        variant: "default",
      });
      return newComment;
    } catch (err: any) {
      setError(err);
      const errorMessage =
        err.response?.data?.message || "Failed to update comment.";

      toast({
        title: "Error",
        duration: 5000,
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateComment,
    loading,
    error,
  };
};

export default useUpdateComment;
