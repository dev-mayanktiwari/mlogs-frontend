import { toast } from "@/hooks/use-toast";
import api from "./apiclient";

const fetcher = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data?.data;
  } catch (error: any) {
    toast({
      title: "Error",
      duration: 5000,
      description: error.response?.data?.message || "Failed to fetch data.",
      variant: "destructive",
    });
  }
};

export default fetcher;
