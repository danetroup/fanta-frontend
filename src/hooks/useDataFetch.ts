// src/hooks/useDataFetch.ts
import { useState, useEffect, useCallback } from 'react';

interface UseDataFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (params?: any) => Promise<void>;
}

// Simple mock API call function
async function mockApiCall<T>(data: T, delay: number = 1000): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

const useDataFetch = <T>(initialData: T | null, mockDataSource: T): UseDataFetchResult<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call using the mock data source
      // In a real application, you would replace this with actual API calls (e.g., axios.get('/api/data', { params }))
      const result = await mockApiCall(mockDataSource, 800);
      setData(result);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [mockDataSource]); // Depend on mockDataSource if it can change

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};

export default useDataFetch;