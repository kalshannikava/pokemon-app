import { useEffect, useState } from 'react';

function useFetch<T> (url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error: any) {
      console.error('Error fetching data: ', error);
      setIsLoading(false);
      setError(error);
      setData(null);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return { data, error, isLoading };
}

export default useFetch;
