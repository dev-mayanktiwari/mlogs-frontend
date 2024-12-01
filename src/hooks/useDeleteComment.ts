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
        description: "Comment delete successfully.",
        variant: "default",
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
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
