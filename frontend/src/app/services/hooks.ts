import useSWR from 'swr';
import {fetcher} from './fetcher';
import {CourseSummary, User, UserSettings} from './types';
import {API_ENDPOINTS} from '../constants/api';

export const useUser = () => useSWR<User>(API_ENDPOINTS.USER.ME, fetcher);
export const useWanikaniSummary = (skipHook: boolean) =>
    useSWR<CourseSummary>(skipHook ? null : API_ENDPOINTS.WANIKANI.SUMMARY, fetcher);
export const useBunproSummary = (skipHook: boolean) =>
    useSWR<CourseSummary>(skipHook ? null : API_ENDPOINTS.BUNPRO.SUMMARY, fetcher);
export const useSettings = () => useSWR<UserSettings>(API_ENDPOINTS.SETTINGS.SETTINGS, fetcher);

export const useCheckUserExists = (login: string) => {
    const {data, error, mutate} = useSWR<{ exists: boolean }>(
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
