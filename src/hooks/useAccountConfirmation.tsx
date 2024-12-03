import { useState } from "react";
import { verifyAccount } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const useAccountConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const accountConfirmation = async (token: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      await verifyAccount(token, code);
      toast({
        title: "Success",
        duration: 5000,
        description: "Account confirmed successfully. You can login now.",
        variant: "default",
      });
    } catch (err: any) {
      setError(err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to verify account. Please try again.";
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
    accountConfirmation,
    loading,
    error,
  };
};

export default useAccountConfirmation;
