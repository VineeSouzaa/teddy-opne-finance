import { ErrorMessages } from './error-messages'

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }

  // Auth errors
  static invalidCredentials(): AppError {
    return new AppError(
      ErrorMessages.AUTH.INVALID_CREDENTIALS,
      401,
      'INVALID_CREDENTIALS'
    )
  }

  static userNotFound(): AppError {
    return new AppError(
      ErrorMessages.AUTH.USER_NOT_FOUND,
      404,
      'USER_NOT_FOUND'
    )
  }

  static unauthorized(): AppError {
    return new AppError(
      ErrorMessages.AUTH.UNAUTHORIZED,
      401,
      'UNAUTHORIZED'
    )
  }

  // User errors
  static emailAlreadyExists(): AppError {
    return new AppError(
      ErrorMessages.USER.EMAIL_ALREADY_EXISTS,
      409,
      'EMAIL_ALREADY_EXISTS'
    )
  }

  static invalidEmailFormat(): AppError {
    return new AppError(
      ErrorMessages.USER.INVALID_EMAIL_FORMAT,
      400,
      'INVALID_EMAIL_FORMAT'
    )
  }

  static nameTooShort(): AppError {
    return new AppError(
      ErrorMessages.USER.NAME_TOO_SHORT,
      400,
      'NAME_TOO_SHORT'
    )
  }

  // Validation errors
  static validationError(message: string): AppError {
    return new AppError(
      message,
      400,
      'VALIDATION_ERROR'
    )
  }

  static requiredField(field: string): AppError {
    return new AppError(
      ErrorMessages.VALIDATION.REQUIRED_FIELD(field),
      400,
      'REQUIRED_FIELD'
    )
  }

  // General errors
  static notFound(resource: string = 'Resource'): AppError {
    return new AppError(
      `${resource} not found`,
      404,
      'NOT_FOUND'
    )
  }

  static internalServerError(): AppError {
    return new AppError(
      ErrorMessages.GENERAL.INTERNAL_SERVER_ERROR,
      500,
      'INTERNAL_SERVER_ERROR'
    )
  }

  // JWT errors
  static jwtExpired(): AppError {
    return new AppError(
      ErrorMessages.JWT.EXPIRED,
      401,
      'JWT_EXPIRED'
    )
  }
} 