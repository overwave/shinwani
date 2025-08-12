import {formDataFetcher, postFetcher} from './fetcher';
import {ApiResponse, User} from './types';
import {API_ENDPOINTS} from '../constants/api';

class ApiService {
    // User authentication methods (mutations only)
    async registerUser(login: string, password: string): Promise<ApiResponse<User>> {
        return postFetcher(API_ENDPOINTS.USER.REGISTER, {login, password});
    }

    async loginUser(username: string, password: string, rememberMe: boolean = true): Promise<ApiResponse<User>> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (rememberMe) {
            formData.append('remember-me', 'true');
        }

        return formDataFetcher(API_ENDPOINTS.USER.LOGIN, formData);
    }

    async logoutUser(): Promise<ApiResponse<void>> {
        return postFetcher(API_ENDPOINTS.USER.LOGOUT);
    }
}

export const apiService = new ApiService();
