'use client';

import {SWRConfig} from 'swr';
import {createOptions, getFullUrl} from '../services/fetcher';
import React from "react";
import {HttpError} from "@/app/services/types";

interface SWRProviderProps {
    children: React.ReactNode;
}

const fetcher = async (url: string, options?: RequestInit) => {
    const defaultOptions = createOptions('GET', options);
    const response = await fetch(getFullUrl(url), defaultOptions);
    if (!response.ok) throw new HttpError(response.status);
    return response.json();
};

export function SWRProvider({children}: SWRProviderProps) {
    return (
        <SWRConfig
            value={{
                fetcher,
                revalidateOnFocus: false,
                revalidateOnReconnect: true,
                errorRetryCount: 3,
                errorRetryInterval: 5000,
                onError: async (err) => {
                    if (err.status == 401) window.location.href = "/login";
                },
            }}
        >
            {children}
        </SWRConfig>
    );
}
