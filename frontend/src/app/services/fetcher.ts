import {getApiUrl} from './config';

export const fetcher = async (url: string, options?: RequestInit) => {
    const defaultOptions = createOptions('GET', options);
    const response = await fetch(getFullUrl(url), defaultOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

export const postFetcher = async <Data, Response>(url: string, data?: Data, options?: RequestInit): Promise<Response> => {
    const defaultOptions = createOptions('POST', options);
    if (data) defaultOptions.body = JSON.stringify(data);

    const response = await fetch(getFullUrl(url), defaultOptions);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

export const formDataFetcher = async (url: string, formData: FormData, options?: RequestInit) => {
    const defaultOptions: RequestInit = {
        method: 'POST',
        credentials: 'include',
        ...options,
    };

    const response = await fetch(getFullUrl(url), {
        ...defaultOptions,
        body: formData,
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

export const putFetcher = async <Data, Response>(url: string, data?: Data, options?: RequestInit): Promise<Response> => {
    const defaultOptions = createOptions('PUT', options);
    if (data) defaultOptions.body = JSON.stringify(data);
    const response = await fetch(getFullUrl(url), defaultOptions);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (response.status === 204) return {} as Response
    return response.json();
};

export const deleteFetcher = async (url: string, options?: RequestInit): Promise<undefined> => {
    const defaultOptions = createOptions('DELETE', options);
    const response = await fetch(getFullUrl(url), defaultOptions);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (response.status === 204) return undefined
    return response.json();
};

function createOptions(method: 'GET' | 'PUT' | 'POST' | 'DELETE', options?: RequestInit) {
    const defaultOptions: RequestInit = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    };
    return defaultOptions;
}

const getFullUrl = (url: string) =>
    url.startsWith('http') ? url : getApiUrl() + url;
