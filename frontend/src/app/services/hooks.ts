import useSWR from 'swr';
import {CourseSummary, User, UserExists, UserSettings} from './types';
import {API_ENDPOINTS} from '../constants/api';

export const useUser = () => useSWR<User>(API_ENDPOINTS.USER.ME);
export const useWanikaniSummary = (skipHook: boolean) =>
    useSWR<CourseSummary>(skipHook ? null : API_ENDPOINTS.WANIKANI.SUMMARY);
export const useBunproSummary = (skipHook: boolean) =>
    useSWR<CourseSummary>(skipHook ? null : API_ENDPOINTS.BUNPRO.SUMMARY);
export const useSettings = () => useSWR<UserSettings>(API_ENDPOINTS.SETTINGS.SETTINGS);

export const useCheckUserExists = (login: string) =>
    useSWR<UserExists>(`${API_ENDPOINTS.USER.CHECK}?login=${encodeURIComponent(login)}`);
