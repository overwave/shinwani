import { useState, useEffect } from 'react';
import { User, Counts } from './types';
import { apiService } from './api';

// Authentication utilities
export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage or session
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            setIsLoggedIn(!!token);
            setLoading(false);
        };
        
        checkAuth();
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return { isLoggedIn, loading, login, logout };
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const userData = await apiService.fetchUser();
            setUser(userData);
            setLoading(false);
        }

        fetchUser();
    }, []);

    return { user, loading };
}

export function useCounts() {
    const [counts, setCounts] = useState<Counts | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            const countsData = await apiService.fetchCounts();
            setCounts(countsData);
            setLoading(false);
        }

        fetchCounts();
    }, []);

    return { counts, loading };
}
