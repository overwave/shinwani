export function getHost(): string {
    // Get API host from environment variable
    const host = process.env.NEXT_PUBLIC_API_HOST;
    if (!host) {
        throw new Error('NEXT_PUBLIC_API_HOST environment variable is not set');
    }
    return host;
}

export function getApiUrl(): string {
    return `${getHost()}/api`;
}

// Log the current configuration for debugging
if (typeof window !== 'undefined') {
    console.log('API Configuration:', {
        host: getHost(),
        apiUrl: getApiUrl(),
        customHost: process.env.NEXT_PUBLIC_API_HOST
    });
}
