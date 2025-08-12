import {formDataFetcher, postFetcher} from './fetcher';

class ApiService {
    // Mutation methods (not using SWR)
    async registerUser(login: string, password: string): Promise<Response> {
        return postFetcher('/user/register', {login, password});
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
