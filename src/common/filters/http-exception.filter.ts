import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionMessage extends HttpException {
  getResponse(): {
    message: string;
  };
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpExceptionMessage, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      message: exception.getResponse().message ?? exception.message,
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
