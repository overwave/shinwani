import { useState, useEffect } from 'react';
import { User, Counts } from './types';
import { apiService } from './api';

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
