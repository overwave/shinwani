import useSWR from 'swr';
import {fetcher} from '@/app/services';
import {Counts, User} from '../services/types';
import {API_ENDPOINTS} from '../constants/api';

export const useUser = () => {
    return useSWR<User>(API_ENDPOINTS.USER.ME, fetcher);
};

export const useCourseCounts = (skipCall: boolean = false) => {
    return useSWR<Counts>(skipCall ? null : API_ENDPOINTS.COURSE.COUNTS, fetcher);
};

export {fetcher};
