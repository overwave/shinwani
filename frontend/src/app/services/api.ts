import {deleteFetcher, formDataFetcher, postFetcher, putFetcher} from './fetcher';
import {
    ApiResponse,
    UpdateBunproCredentials,
    UpdateCredentialsResponse,
    UpdateWanikaniCredentials,
    User
} from './types';
import {API_ENDPOINTS} from '../constants/api';
import {mutate} from "swr";

class ApiService {
    registerUser = async (login: string, password: string): Promise<ApiResponse<User>> =>
        postFetcher(API_ENDPOINTS.USER.REGISTER, {login, password});

    async loginUser(username: string, password: string, rememberMe: boolean = true) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (rememberMe) {
            formData.append('remember-me', 'true');
        }
        await formDataFetcher(API_ENDPOINTS.USER.LOGIN, formData);
        await mutate(() => true, undefined, {revalidate: false});
    }

    logoutUser = async (): Promise<undefined> => postFetcher(API_ENDPOINTS.USER.LOGOUT);

    updateWanikaniSettings = async (credentials: UpdateWanikaniCredentials): Promise<UpdateCredentialsResponse> =>
        putFetcher(API_ENDPOINTS.SETTINGS.UPDATE_WANIKANI, credentials);

    updateBunproSettings = async (credentials: UpdateBunproCredentials): Promise<UpdateCredentialsResponse> =>
        putFetcher(API_ENDPOINTS.SETTINGS.UPDATE_BUNPRO, credentials);

    deleteWanikaniSettings = async (): Promise<void> => deleteFetcher(API_ENDPOINTS.SETTINGS.DELETE_WANIKANI);

    deleteBunproSettings = async (): Promise<void> => deleteFetcher(API_ENDPOINTS.SETTINGS.DELETE_BUNPRO);
}

export const apiService = new ApiService();
