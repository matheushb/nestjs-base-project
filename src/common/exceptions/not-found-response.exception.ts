import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from './http-response.exception';
import { HttpStatus } from '@nestjs/common';

export class NotFoundResponse implements HttpExceptionResponse {
  @ApiProperty({ example: 'Entity not found' })
  message: string = 'Entity not found';

  @ApiProperty({ example: '/route' })
  path: string = '/route';

  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number = HttpStatus.NOT_FOUND;

  @ApiProperty()
  timestamp: Date = new Date();

  constructor(path?: string, entity?: string) {
    if (entity) this.message = `${entity} not found`;
    if (path) this.path = path;
  }
}
