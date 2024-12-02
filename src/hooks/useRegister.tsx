import { register as registerAPI } from "../lib/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const register = async (
    email: string,
    password: string,
    username: string,
    name: string
  ) => {
    try {
      setLoading(true);
      await registerAPI(name, email, password, username);
      toast({
        title: "Registration Successful",
        duration: 5000,
        description: "Please check your email to verify your account.",
        variant: "default",
      });
      navigate("/login");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to register. Please try again.";
      toast({
        title: "Registration Failed",
        duration: 5000,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export default useRegister;
