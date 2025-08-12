import useSWR from 'swr';
import {fetcher} from '@/app/services';
import {CourseCounts, User} from '../types';
import {API_ENDPOINTS} from '../constants/api';

// User-related hooks (for data fetching)
export const useUser = () => {
    return useSWR<User>(API_ENDPOINTS.USER.CHECK, fetcher);
};

export const useUserDetails = () => {
    return useSWR<User>(API_ENDPOINTS.USER.DETAILS, fetcher);
};

// Course-related hooks (for data fetching)
export const useCourseCounts = () => {
    return useSWR<CourseCounts>(API_ENDPOINTS.COURSE.COUNTS, fetcher);
};

// Custom hook for conditional fetching
export const useConditionalFetch = <T>(
    url: string | null,
    fetcherFn: (url: string) => Promise<T>
) => {
    return useSWR<T>(url, fetcherFn);
};

// Export fetcher for direct use when needed
export {fetcher};
