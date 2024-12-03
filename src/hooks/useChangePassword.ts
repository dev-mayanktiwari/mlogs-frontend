import { useState } from "react";
import { changePassword as changePasswordAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const newComment = await changePasswordAPI(
        oldPassword,
        newPassword,
        confirmNewPassword
      );
      toast({
        title: "Success",
        duration: 5000,
        description: "Password changed successfully.",
        variant: "default",
      });
      return newComment;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        duration: 5000,
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    error,
  };
};

export default useChangePassword;
