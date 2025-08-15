export const API_ENDPOINTS = {
  USER: {
    REGISTER: '/users/register',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    CHECK: '/users/check',
    ME: '/users/me',
    SETTINGS: '/users/settings',
    UPDATE_WANIKANI: '/users/settings/wanikani',
    UPDATE_BUNPRO: '/users/settings/bunpro',
    DELETE_WANIKANI: '/users/settings/wanikani',
    DELETE_BUNPRO: '/users/settings/bunpro',
  },
  
  COURSE: {
    COUNTS: '/courses/counts',
  },
} as const;
