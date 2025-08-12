import useSWR from 'swr';
import { fetcher } from './fetcher';
import { User, Counts } from './types';
import { API_ENDPOINTS } from '../constants/api';

export const useUser = () => useSWR<User>(API_ENDPOINTS.USER.ME, fetcher);
export const useCounts = () => useSWR<Counts>(API_ENDPOINTS.COURSE.COUNTS, fetcher);

export const useCheckUserExists = (login: string) => {
  const { data, error, mutate } = useSWR<{ exists: boolean }>(
    login ? `${API_ENDPOINTS.USER.CHECK}?login=${encodeURIComponent(login)}` : null,
    fetcher
  );

  return {
    exists: data?.exists,
    loading: !error && !data,
    error,
    mutate,
  };
};
