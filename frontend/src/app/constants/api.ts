export const API_ENDPOINTS = {
  USER: {
    REGISTER: '/users/register',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    CHECK: '/users/check',
    ME: '/users/me',
    SETTINGS: '/users/settings',
  },
  
  COURSE: {
    COUNTS: '/courses/counts',
  },
} as const;
