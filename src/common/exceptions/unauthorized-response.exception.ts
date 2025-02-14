import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from './http-response.exception';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedResponse implements HttpExceptionResponse {
  @ApiProperty({ example: 'Unauthorized' })
  message: string = 'Unauthorized';

  @ApiProperty({ example: '/route' })
  path: string = '/route';

  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: number = HttpStatus.UNAUTHORIZED;

  @ApiProperty()
  timestamp: Date = new Date();

  constructor(path?: string, message?: string) {
    if (message) this.message = message;
    if (path) this.path = path;
  }
}
