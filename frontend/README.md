## Frontend Architecture (React + Next.js + TypeScript + SWR)

This document outlines a canonical, pragmatic structure for a Next.js (App Router) frontend using TypeScript and SWR, including JSON and multipart/form-data POST patterns. Hosts are configured via environment variables; do not hardcode them.

### Canonical folder structure

```text
frontend/
  public/                      # Static assets
  src/
    app/                       # Next.js App Router
      api/                     # Route handlers (only if needed on frontend)
      components/              # UI components, colocated by feature
        navbar/
        lessons/
        reviews/
      constants/               # Constants like API endpoint maps
      hooks/                   # SWR data-fetching hooks (GET)
      providers/               # App-wide providers (e.g. SWR)
      services/                # API client, fetchers, config, types
        api.ts                 # High-level API methods (mutations, etc.)
        fetcher.ts             # GET/POST/form-data helpers
        config.ts              # Env-driven base URL helpers
        index.ts               # Re-exports for convenience
        types.ts               # API-level types shared across services/hooks
      types/                   # UI-level types
      globals.scss             # Global styles
      layout.tsx               # Root layout; place Providers here
      page.tsx                 # Example route
    ...
  next.config.ts
  tsconfig.json
  eslint.config.mjs
  package.json
```

### Environment configuration

- Define public host in env (build-time): `NEXT_PUBLIC_API_HOST`.
- Example `.env.local`:

```bash
NEXT_PUBLIC_API_HOST=https://your-domain.example
```

In code, `services/config.ts` resolves `getApiUrl()` from `NEXT_PUBLIC_API_HOST`. This keeps hosts out of source control and aligned with deployment pipelines.

### SWR setup

1) Provider with sensible defaults (already implemented as `app/providers/SWRProvider.tsx`).

```tsx
// app/providers/SWRProvider.tsx
'use client'
import { SWRConfig } from 'swr'
import { fetcher } from '@/app/services/fetcher'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false, errorRetryCount: 3 }}>
      {children}
    </SWRConfig>
  )
}
```

2) Wrap the app in the provider:

```tsx
// app/layout.tsx
import { SWRProvider } from '@/app/providers/SWRProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  )
}
```

### API layer (fetch helpers and service)

Centralize network logic to ensure consistency (credentials, headers, base URL, error handling):

```ts
// app/services/fetcher.ts (simplified)
import { getApiUrl } from './config'

export async function fetcher(url: string, options?: RequestInit) {
  const base = getApiUrl()
  const full = url.startsWith('http') ? url : `${base}${url}`
  const res = await fetch(full, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    ...options,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function postFetcher<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
  const base = getApiUrl()
  const full = url.startsWith('http') ? url : `${base}${url}`
  const res = await fetch(full, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    body: body != null ? JSON.stringify(body) : undefined,
    ...options,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function formDataFetcher<T>(url: string, formData: FormData, options?: RequestInit): Promise<T> {
  const base = getApiUrl()
  const full = url.startsWith('http') ? url : `${base}${url}`
  const res = await fetch(full, { method: 'POST', credentials: 'include', body: formData, ...options })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
```

High-level service methods encapsulate endpoint paths and payload shapes:

```ts
// app/services/api.ts (excerpt)
import { API_ENDPOINTS } from '@/app/constants/api'
import { postFetcher, formDataFetcher } from './fetcher'
import type { ApiResponse, User } from '@/app/services/types'

class ApiService {
  registerUser(login: string, password: string) {
    return postFetcher<ApiResponse<User>>(API_ENDPOINTS.USER.REGISTER, { login, password })
  }
  loginUser(username: string, password: string, rememberMe = true) {
    const fd = new FormData()
    fd.append('username', username)
    fd.append('password', password)
    if (rememberMe) fd.append('remember-me', 'true')
    return formDataFetcher<ApiResponse<User>>(API_ENDPOINTS.USER.LOGIN, fd)
  }
  logoutUser() {
    return postFetcher<ApiResponse<void>>(API_ENDPOINTS.USER.LOGOUT)
  }
}

export const apiService = new ApiService()
```

### Data fetching (GET) with SWR

Create tiny, typed hooks that hide endpoint details and return cached data:

```ts
// app/hooks/useApi.ts (excerpt)
import useSWR from 'swr'
import { API_ENDPOINTS } from '@/app/constants/api'
import type { User, CourseCounts } from '@/app/services/types'

export const useUser = () => useSWR<User>(API_ENDPOINTS.USER.CHECK)
export const useUserDetails = () => useSWR<User>(API_ENDPOINTS.USER.DETAILS)
export const useCourseCounts = () => useSWR<CourseCounts>(API_ENDPOINTS.COURSE.COUNTS)
```

Usage in a component:

```tsx
import { useCourseCounts } from '@/app/services'

export function DashboardCounts() {
  const { data, isLoading, error } = useCourseCounts()
  if (isLoading) return <span>Loading…</span>
  if (error) return <span>Failed to load</span>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

### Mutations (POST) patterns

- JSON body:

```ts
import { apiService } from '@/app/services'

async function onRegister(login: string, password: string) {
  const res = await apiService.registerUser(login, password)
  // optionally: mutate affected SWR keys
}
```

- Multipart/form-data (e.g., login or file upload):

```ts
import { formDataFetcher } from '@/app/services'

async function uploadAvatar(file: File) {
  const fd = new FormData()
  fd.append('avatar', file)
  await formDataFetcher('/user/avatar', fd)
}
```

- Optional: SWR mutation helper (if using `useSWRMutation`):

```ts
// npm i swr
import useSWRMutation from 'swr/mutation'

function postJson(_key: string, { arg }: { arg: { url: string; body?: unknown } }) {
  return postFetcher(arg.url, arg.body)
}

export function useRegisterMutation() {
  return useSWRMutation('register', postJson)
}
```

### Conventions

- **Types at the edge**: Define request/response models in `app/services/types.ts`. Use them in hooks and services.
- **Endpoints in one place**: Keep `API_ENDPOINTS` in `app/constants/api.ts`.
- **No hardcoded hosts**: Always derive base URLs from `NEXT_PUBLIC_API_HOST`.
- **Credentials**: If you rely on cookies/sessions, keep `credentials: 'include'` in fetchers.
- **Errors**: Throw on non-2xx; handle at call sites (render fallback UI or toasts).

### Quick start

```bash
# install
npm i

# configure env
echo NEXT_PUBLIC_API_HOST=https://your-domain.example > .env.local

# run
npm run dev
```

Open `http://localhost:3000`.
