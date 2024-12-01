import api from "./api";

const fetcher = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data?.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetcher;
