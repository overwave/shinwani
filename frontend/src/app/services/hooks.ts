import useSWR from 'swr';
import { fetcher } from './fetcher';
import { User, Counts } from './types';

// Hook for fetching user data
export const useUser = () => {
  return useSWR<User>('/user/me', fetcher);
};

// Hook for fetching counts data
export const useCounts = () => {
  return useSWR<Counts>('/counts', fetcher);
};

// Hook for checking if a user exists
export const useCheckUser = (login: string | null) => {
  return useSWR<{ exists: boolean }>(
    login ? `/user/check?login=${login}` : null,
    fetcher
  );
};

// Hook for checking user existence (for login page)
export const useCheckUserExists = (login: string) => {
  const { data, error, mutate } = useSWR<{ exists: boolean }>(
    login ? `/user/check?login=${login}` : null,
    fetcher
  );

  return {
    exists: data?.exists,
    loading: !error && !data,
    error,
    mutate
  };
};
