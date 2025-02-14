import { UserFromJwt } from '@/modules/auth/dtos/user-from-jwt.dto';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionMessage extends HttpException {
  getResponse(): {
    message: string;
  };
}

type RequestWithUser = Request & { user: UserFromJwt };

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: HttpExceptionMessage, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithUser>();
    const status = exception.getStatus();

    const { method, url } = request;

    this.logger.error(
      `method=${method} path="${url}" status=${status} user="${request?.user?.email ?? 'anonymous'}"`,
    );

    response.status(status).json({
      message: exception.getResponse().message ?? exception.message,
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
