import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    switch (exception.code) {
      case 'P2003': {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Foreign key constraint failed on the field ${exception.meta.field_name}`,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
      }
      case 'P2002': {
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `Unique constraint failed on the field ${exception.meta.target}`,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
      }
      case 'P2025': {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Record not found`,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
      }
      default: {
        console.log(exception);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Prisma Internal Server Error',
          path: request.url,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }
}
