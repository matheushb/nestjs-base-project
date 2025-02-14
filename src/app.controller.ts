import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

const route = '/health';

@ApiTags('app')
@ApiOkResponse({ description: 'Health check', example: { status: 'ok' } })
@Controller(route)
export class AppController {
  @Get()
  health(): { status: string } {
    return { status: 'ok' };
  }
}
