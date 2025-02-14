import { BadRequestResponse } from '@/common/exceptions/bad-request-response.exception';
import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export function ApiBadRequestExceptionReponse(
  route?: string,
  message?: string[],
) {
  return applyDecorators(
    ApiBadRequestResponse({
      type: BadRequestResponse,
      example: new BadRequestResponse(route, message),
    }),
  );
}
