import {Counts, User} from './types';

class ApiService {
    private baseUrl = '/api';

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
}

export const apiService = new ApiService();
