import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from './http-response.exception';
import { HttpStatus } from '@nestjs/common';

export class ConflictResponse implements HttpExceptionResponse {
  @ApiProperty({ example: 'Conflict' })
  message: string = 'Conflict';

  @ApiProperty({ example: '/route' })
  path: string = '/route';

  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode: number = HttpStatus.CONFLICT;

  @ApiProperty()
  timestamp: Date = new Date();

  constructor(path?: string, message?: string) {
    if (message) this.message = message;
    if (path) this.path = path;
  }
}
