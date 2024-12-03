import { useState } from "react";
import { resetPassword as resetPasswordAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const resetPassword = async (token: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await resetPasswordAPI(token, password);
      toast({
        title: "Success",
        duration: 5000,
        description: "Password reset successfully.",
        variant: "default",
      });
      navigate("/login");
    } catch (err: any) {
      setError(err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast({
        title: "Error",
        duration: 5000,
        description: errorMessage,
        variant: "destructive",
      });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPassword,
    loading,
    error,
  };
};

export default useResetPassword;
