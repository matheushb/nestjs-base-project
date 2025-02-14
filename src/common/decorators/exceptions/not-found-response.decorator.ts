import { NotFoundResponse } from '@/common/exceptions/not-found-response.exception';
import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';

export function ApiNotFoundExceptionReponse(route?: string, entity?: string) {
  return applyDecorators(
    ApiNotFoundResponse({
      type: NotFoundResponse,
      example: new NotFoundResponse(route, entity),
    }),
  );
}
