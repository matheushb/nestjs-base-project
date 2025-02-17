import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';

import {
  FindAllUserResponse,
  UserFilterParams,
} from './dtos/find-all-user.dto';
import { Role } from './enums/role.enum';
import { ApiBadRequestExceptionReponse } from '@/common/decorators/exceptions/bad-request-response.decorator';
import { ApiUnauthorizedExceptionReponse } from '@/common/decorators/exceptions/unauthorized-response.decorator';
import { ApiForbiddenExceptionReponse } from '@/common/decorators/exceptions/forbidden-response.decorator';
import { ApiNotFoundExceptionReponse } from '@/common/decorators/exceptions/not-found-response.decorator';
import { User } from './entity/user.entity';
import { Roles } from '@/common/decorators/roles/roles.decorator';
import { NoRoles } from '@/common/decorators/roles/no-roles.decorator';
import {
  RequestUser,
  UserFromRequest,
} from '@/common/decorators/user/user-from-request.decorator';

const route = '/users';
const routeId = '/users/:id';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.USER, Role.ADMIN) // Deixei a role user aqui pra facilitar o uso da Api, porém, o ideal é que USER não tenha acesso a esses endpoints
@ApiTags('users')
@Controller({ path: route, version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiUnauthorizedExceptionReponse(route)
  @ApiForbiddenExceptionReponse(route)
  @ApiBadRequestExceptionReponse(route)
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOkResponse({ type: FindAllUserResponse })
  @ApiUnauthorizedExceptionReponse(route)
  @ApiForbiddenExceptionReponse(route)
  findAll(@Query() params: UserFilterParams) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiForbiddenExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'User')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: FindAllUserResponse })
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiForbiddenExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'User')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @NoRoles()
  @Patch('update/me')
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestExceptionReponse(route)
  @ApiUnauthorizedExceptionReponse(route)
  async updateMe(
    @UserFromRequest() user: RequestUser,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(user.id, body);
  }

  @Delete(':id')
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiForbiddenExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'User')
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
