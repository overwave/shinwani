import {Counts, User} from './types';
import { getApiUrl } from './config';

class ApiService {
    private baseUrl = getApiUrl();

    async fetchUser(): Promise<User | null> {
        const response = await fetch(`${this.baseUrl}/user`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async fetchCounts(): Promise<Counts | null> {
        const response = await fetch(`${this.baseUrl}/counts`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async checkUser(login: string): Promise<{ exists: boolean }> {
        const response = await fetch(`${this.baseUrl}/user/check?login=${login}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async registerUser(login: string, password: string): Promise<Response> {
        return fetch(`${this.baseUrl}/user/register`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({login, password}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async loginUser(username: string, password: string, rememberMe: boolean = true): Promise<Response> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (rememberMe) {
            formData.append('remember-me', 'true');
        }

        return fetch(`${this.baseUrl}/user/login`, {
            method: "POST",
            body: formData,
            credentials: 'include',
        });
    }
}

export const apiService = new ApiService();
