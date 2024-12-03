import { useState } from "react";
import { forgotPassword as forgotPasswordAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const newComment = await forgotPasswordAPI(email);
      toast({
        title: "Success",
        duration: 5000,
        description: "Check you mail to reset password.",
        variant: "default",
      });
      return newComment;
    } catch (err: any) {
      setError(err);
      const errorMessage =
        err.response?.data?.message || "Failed to reset. Please try again.";
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
    forgotPassword,
    loading,
    error,
  };
};

export default useForgotPassword;
