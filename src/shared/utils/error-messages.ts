export const ErrorMessages = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_NOT_FOUND: 'User not found',
    UNAUTHORIZED: 'Unauthorized access',
    TOKEN_EXPIRED: 'Token expired',
    INVALID_TOKEN: 'Invalid token',
  },
  USER: {
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    INVALID_EMAIL_FORMAT: 'Invalid email format',
    NAME_TOO_SHORT: 'Name must be at least 2 characters long',
    PASSWORD_REQUIRED: 'Password is required',
    USER_NOT_FOUND: 'User not found',
  },
  VALIDATION: {
    REQUIRED_FIELD: (field: string) => `${field} is required`,
    INVALID_FORMAT: (field: string) => `Invalid ${field} format`,
    MIN_LENGTH: (field: string, min: number) => `${field} must be at least ${min} characters`,
    MAX_LENGTH: (field: string, max: number) => `${field} must not exceed ${max} characters`,
  },
  GENERAL: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NOT_FOUND: 'Resource not found',
    BAD_REQUEST: 'Bad request',
    FORBIDDEN: 'Access forbidden',
  },
  JWT: {
    EXPIRED: 'Expired session',
  },
} as const

// Type for better IntelliSense
export type ErrorMessageKey = keyof typeof ErrorMessages 