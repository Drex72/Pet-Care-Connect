import { AxiosResponse } from "axios";
import { useState } from "react";

export default <T, K>(apiFunc: (arg: K) => Promise<AxiosResponse>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const request = async (arg?: K): Promise<T | null> => {
    setLoading(true);
    try {
      const result = await apiFunc(arg!);
      setData(result.data);
      return result.data;
    } catch (err: any) {
      const error = err.response?.data;

      if (!error.message) {
        if (err.message) {
          error.message = err.message;
        } else {
          error.message = "Something Went Wrong!";
        }
      }
      setError(err.response?.data);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError({});
    setData(null);
  };

  return {
    data,
    error,
    loading,
    request,
    reset,
  };
};
