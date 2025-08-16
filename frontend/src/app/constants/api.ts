export const API_ENDPOINTS = {
    USER: {
        REGISTER: '/users/register',
        LOGIN: '/users/login',
        LOGOUT: '/users/logout',
        CHECK: '/users/check',
        ME: '/users/me',
    },

    SETTINGS: {
        SETTINGS: '/settings',
        UPDATE_WANIKANI: '/settings/wanikani',
        UPDATE_BUNPRO: '/settings/bunpro',
        DELETE_WANIKANI: '/settings/wanikani',
        DELETE_BUNPRO: '/settings/bunpro',
    },

    COURSE: {
        COUNTS: '/courses/counts',
    },
} as const;
