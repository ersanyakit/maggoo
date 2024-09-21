import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { DEFAULT_API_URL } from '@/app/constants';

interface UseAxiosPostResult<T> {
  data: T | null;
  error: any;
  loading: boolean;
  postData: (postData: any) => Promise<void>;
}

const useAxiosPost = <T>(url: string, initialData: T | {} = {}): UseAxiosPostResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const postData = async (postData: any): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios.post(`${DEFAULT_API_URL}${url}`, postData);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
};

export default useAxiosPost;