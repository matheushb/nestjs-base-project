import { ConflictResponse } from '@/common/exceptions/conflict-response.exception';
import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse } from '@nestjs/swagger';

export function ApiConflictExceptionReponse(route?: string, message?: string) {
  return applyDecorators(
    ApiConflictResponse({
      type: ConflictResponse,
      example: new ConflictResponse(route, message),
    }),
  );
}
