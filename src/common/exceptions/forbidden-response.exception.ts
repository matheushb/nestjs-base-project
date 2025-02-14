import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from './http-response.exception';
import { HttpStatus } from '@nestjs/common';

export class ForbiddenResponse implements HttpExceptionResponse {
  @ApiProperty({ example: 'Forbidden resource' })
  message: string = 'Forbidden resource';

  @ApiProperty({ example: '/route' })
  path: string = '/route';

  @ApiProperty({ example: HttpStatus.FORBIDDEN })
  statusCode: number = HttpStatus.FORBIDDEN;

  @ApiProperty()
  timestamp: Date = new Date();

  constructor(path?: string, message?: string) {
    if (message) this.message = message;
    if (path) this.path = path;
  }
}
