import { UnauthorizedResponse } from '@/common/exceptions/unauthorized-response.exception';
import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export function ApiUnauthorizedExceptionReponse(route?: string) {
  return applyDecorators(
    ApiUnauthorizedResponse({
      type: UnauthorizedResponse,
      example: new UnauthorizedResponse(route),
    }),
  );
}
