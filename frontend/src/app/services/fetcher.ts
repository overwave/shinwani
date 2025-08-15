import { getApiUrl } from './config';

export const fetcher = async (url: string, options?: RequestInit) => {
  const baseUrl = getApiUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  const response = await fetch(fullUrl, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const postFetcher = async (url: string, data?: any, options?: RequestInit) => {
  const baseUrl = getApiUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const defaultOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  if (data) {
    defaultOptions.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const formDataFetcher = async (url: string, formData: FormData, options?: RequestInit) => {
  const baseUrl = getApiUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const defaultOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    ...options,
  };

  const response = await fetch(fullUrl, {
    ...defaultOptions,
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const putFetcher = async (url: string, data?: any, options?: RequestInit) => {
  const baseUrl = getApiUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const defaultOptions: RequestInit = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  if (data) {
    defaultOptions.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // For void endpoints, return undefined
  return undefined;
};

export const deleteFetcher = async (url: string, options?: RequestInit) => {
  const baseUrl = getApiUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const defaultOptions: RequestInit = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  const response = await fetch(fullUrl, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // For void endpoints, return undefined
  return undefined;
};
