import { useState } from "react";
import { verifyAccount } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      accountConfirmation: {
        isVerified: boolean;
      };
    };
  };
}

const useAccountConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [verificationData, setVerificationData] =
    useState<VerificationResponse | null>(null);
  const { toast } = useToast();

  const accountConfirmation = async (token: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: VerificationResponse = await verifyAccount(token, code);
      setVerificationData(response);
      if (response.success) {
        toast({
          title: "Success",
          description:
            response.message ||
            "Account confirmed successfully. You can login now.",
          variant: "default",
        });
      } else {
        throw new Error(response.message || "Verification failed");
      }
    } catch (err: any) {
      setError(err);
      const errorMessage =
        err.message || "Failed to verify account. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    accountConfirmation,
    loading,
    error,
    verificationData,
  };
};

export default useAccountConfirmation;
