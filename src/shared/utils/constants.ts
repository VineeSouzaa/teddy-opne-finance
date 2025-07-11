export const AppConstants = {
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 100,
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
  AUTH: {
    TOKEN_EXPIRY: '24h',
    REFRESH_TOKEN_EXPIRY: '7d',
  },
} as const
