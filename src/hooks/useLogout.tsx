import { useState } from "react";
import { logout as apiLogout } from "@/lib/api";
import useUserStore from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const clearUser = useUserStore((state) => state.clearUser);
  const { toast } = useToast();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiLogout();
      clearUser();
      toast({
        title: "Success",
        duration: 5000,
        description: "You have successfully logged out.",
        variant: "default",
      });
      navigate("/");
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        duration: 5000,
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error,
  };
};

export default useLogout;
