import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from './http-response.exception';
import { HttpStatus } from '@nestjs/common';

export class BadRequestResponse implements HttpExceptionResponse {
  @ApiProperty()
  message: string[] = ['Email must be an email'];

  @ApiProperty({ example: '/route' })
  path: string = '/route';

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number = HttpStatus.BAD_REQUEST;

  @ApiProperty()
  timestamp: Date = new Date();

  constructor(path?: string, message?: string[]) {
    if (message) this.message = message;
    if (path) this.path = path;
  }
}
