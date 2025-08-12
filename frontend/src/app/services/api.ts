import {Counts, User} from './types';
import { getApiUrl } from './config';
import { fetcher, postFetcher, formDataFetcher } from './fetcher';

class ApiService {
    private baseUrl = getApiUrl();

    // SWR-compatible data fetching methods
    async fetchUser(): Promise<User | null> {
        return fetcher('/user/me');
    }

    async fetchCounts(): Promise<Counts | null> {
        return fetcher('/counts');
    }

    async checkUser(login: string): Promise<{ exists: boolean }> {
        return fetcher(`/user/check?login=${login}`);
    }

    // Mutation methods (not using SWR)
    async registerUser(login: string, password: string): Promise<Response> {
        return postFetcher('/user/register', { login, password });
    }

    async loginUser(username: string, password: string, rememberMe: boolean = true): Promise<Response> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (rememberMe) {
            formData.append('remember-me', 'true');
        }

        return formDataFetcher('/user/login', formData);
    }

    async logoutUser(): Promise<Response> {
        return postFetcher('/user/logout');
    }
}

export const apiService = new ApiService();
