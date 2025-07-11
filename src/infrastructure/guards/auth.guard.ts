
import {
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { AppError } from '@shared/utils/app-errors';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw AppError.unauthorized()
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET ?? 'secret'
          }
        );
        request['user'] = payload;
      } catch (error) {
        if(error instanceof Error && error.message === 'jwt expired') {
          throw AppError.jwtExpired()
        }
        throw AppError.internalServerError()
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  