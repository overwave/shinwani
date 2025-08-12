import {formDataFetcher, postFetcher} from './fetcher';
import {ApiResponse, User} from '../types';
import {API_ENDPOINTS} from '../constants/api';

class ApiService {
    // User authentication methods (mutations only)
    async registerUser(login: string, password: string): Promise<ApiResponse<User>> {
        const response = await postFetcher(API_ENDPOINTS.USER.REGISTER, {login, password});
        return response.json();
    }

    async loginUser(username: string, password: string, rememberMe: boolean = true): Promise<ApiResponse<User>> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (rememberMe) {
            formData.append('remember-me', 'true');
        }

        const response = await formDataFetcher(API_ENDPOINTS.USER.LOGIN, formData);
        return response.json();
    }

    async logoutUser(): Promise<ApiResponse<void>> {
        const response = await postFetcher(API_ENDPOINTS.USER.LOGOUT);
        return response.json();
    }
}

export const apiService = new ApiService();
