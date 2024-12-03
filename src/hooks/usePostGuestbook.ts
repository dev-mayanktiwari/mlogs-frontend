import { useState } from "react";
import { postGuestbook } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const usePostGuestbook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const postMessage = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const message = await postGuestbook(text);
      toast({
        title: "Success",
        duration: 5000,
        description: "Message posted successfully.",
        variant: "default",
      });
      return message;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        duration: 5000,
        description: "Failed to post message. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    postMessage,
    loading,
    error,
  };
};

export default usePostGuestbook;
