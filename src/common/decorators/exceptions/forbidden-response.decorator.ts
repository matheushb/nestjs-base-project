import { ForbiddenResponse } from '@/common/exceptions/forbidden-response.exception';
import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';

export function ApiForbiddenExceptionReponse(route?: string) {
  return applyDecorators(
    ApiForbiddenResponse({
      type: ForbiddenResponse,
      example: new ForbiddenResponse(route),
    }),
  );
}
