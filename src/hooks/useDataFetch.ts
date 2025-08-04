// src/hooks/useDataFetch.ts

/**
 * @wizard
 * @name useDataFetch
 * @description A custom React hook for simulating asynchronous data fetching from mock sources, managing loading, error, and data states.
 * @tags hook, data, utility, fetch, mock
 * @props
 * - name: initialData
 * type: T | null
 * description: The initial data state before fetching begins.
 * - name: mockDataSource
 * type: T
 * description: The mock data object or array to be "fetched" by this hook.
 * @returns
 * - name: data
 * type: T | null
 * description: The fetched data, or null if not yet loaded or an error occurred.
 * - name: loading
 * type: boolean
 * description: True if data is currently being fetched, false otherwise.
 * - name: error
 * type: string | null
 * description: An error message if the fetch failed, or null if successful.
 * - name: fetchData
 * type: (params?: any) => Promise<void>
 * description: A function to manually trigger a re-fetch of the data.
 * @category utility
 */
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

  const fetchData = useCallback(async (_params?: any) => {
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