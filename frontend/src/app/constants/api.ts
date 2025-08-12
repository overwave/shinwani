export const API_ENDPOINTS = {
  USER: {
    REGISTER: '/users/register',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    CHECK: '/users/check',
    ME: '/users/me',
  },
  
  COURSE: {
    COUNTS: '/courses/counts',
  },
} as const;
