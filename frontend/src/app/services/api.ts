import {deleteFetcher, formDataFetcher, postFetcher, putFetcher} from './fetcher';
import {ApiResponse, User} from './types';
import {API_ENDPOINTS} from '../constants/api';

class ApiService {
    registerUser = async (login: string, password: string): Promise<ApiResponse<User>> =>
        postFetcher(API_ENDPOINTS.USER.REGISTER, {login, password});

    async loginUser(username: string, password: string, rememberMe: boolean = true): Promise<ApiResponse<User>> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (rememberMe) {
            formData.append('remember-me', 'true');
        }

        return formDataFetcher(API_ENDPOINTS.USER.LOGIN, formData);
    }

    logoutUser = async (): Promise<ApiResponse<void>> => postFetcher(API_ENDPOINTS.USER.LOGOUT);

    updateWanikaniSettings = async (apiToken: string): Promise<void> =>
        putFetcher(API_ENDPOINTS.USER.UPDATE_WANIKANI, {apiToken});

    updateBunproSettings = async (email: string, password: string): Promise<void> =>
        putFetcher(API_ENDPOINTS.USER.UPDATE_BUNPRO, {email, password});

    deleteWanikaniSettings = async (): Promise<void> => deleteFetcher(API_ENDPOINTS.USER.DELETE_WANIKANI);

    deleteBunproSettings = async (): Promise<void> => deleteFetcher(API_ENDPOINTS.USER.DELETE_BUNPRO);
}

export const apiService = new ApiService();
