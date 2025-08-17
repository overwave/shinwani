'use client';

import {SWRConfig} from 'swr';
import {createOptions, getFullUrl} from '../services/fetcher';
import React from "react";
import Router from "next/router";

interface SWRProviderProps {
    children: React.ReactNode;
}

class HttpError extends Error {
    status: number;

    constructor(status: number, message?: string) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

const fetcher = async (url: string, options?: RequestInit) => {
    const defaultOptions = createOptions('GET', options);
    const response = await fetch(getFullUrl(url), defaultOptions);
    if (!response.ok) throw new HttpError(response.status);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
                    if (err.status === 403) {
                        window.location.href = "/login";
                    }
                },
            }}
        >
            {children}
        </SWRConfig>
    );
}
