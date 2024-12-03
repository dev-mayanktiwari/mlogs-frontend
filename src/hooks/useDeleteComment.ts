import { useState } from "react";
import { deleteComment as deleteCommentAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const useUpdateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const deleteComment = async (commentId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCommentAPI(commentId);
      toast({
        title: "Success",
        duration: 5000,
        description: "Comment delete successfully.",
        variant: "default",
      });
    } catch (err: any) {
      setError(err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to delete comment. Please try again.";
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
    deleteComment,
    loading,
    error,
  };
};

export default useUpdateComment;
