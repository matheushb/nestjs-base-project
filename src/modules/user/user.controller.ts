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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './entity/user.entity';
import {
  HasPaginationQuery,
  Pagination,
  PrismaPaginationParams,
} from '../auth/decorators/pagination.decorator';
import {
  RequestUser,
  UserFromRequest,
} from '../auth/decorators/user-from-request.decorator';
import { NoRoles } from '../auth/decorators/no-roles.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER) // Deixei a role user aqui pra facilitar o uso da Api, porém, o ideal é que USER não tenha acesso a esses endpoints
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    return {
      statusCode: 201,
      message: 'User created successfully',
      user: createdUser,
    };
  }

  @Get()
  @HasPaginationQuery()
  findAll(@Pagination() pagination: PrismaPaginationParams) {
    return this.userService.findAll(pagination);
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return {
      user,
    };
  }

  @Patch('id/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return {
      user: updatedUser,
    };
  }

  @NoRoles()
  @Patch('update/me')
  async updateMe(
    @UserFromRequest() user: RequestUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(user.id, updateUserDto);
    return {
      user: updatedUser,
    };
  }

  @Delete('id/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
