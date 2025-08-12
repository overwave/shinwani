export const API_ENDPOINTS = {
  USER: {
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',
    CHECK: '/user/check',
    DETAILS: '/user/details',
  },
  
  COURSE: {
    COUNTS: '/course/counts',
  },
} as const;
