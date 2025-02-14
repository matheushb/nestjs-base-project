import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SigninDto } from './dtos/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Role } from '../user/enums/role.enum';
import { ApiUnauthorizedExceptionReponse } from '@/common/decorators/exceptions/unauthorized-response.decorator';
import { ApiConflictExceptionReponse } from '@/common/decorators/exceptions/conflict-response.decorator';
import { ApiBadRequestExceptionReponse } from '@/common/decorators/exceptions/bad-request-response.decorator';
import { UserWithJwt } from './dtos/user-with-jwt.dto';
import { AuthMeResponse } from './dtos/user-from-jwt.dto';
import { User } from '../user/entity/user.entity';

const route = '/auth';

@ApiTags('auth')
@Controller(route)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SigninDto })
  @ApiCreatedResponse({ type: UserWithJwt })
  @ApiUnauthorizedExceptionReponse(route)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Request() request: Request & { user: User }) {
    const access_token = await this.authService.login({
      email: request.user.email,
      id: request.user.id,
      role: request.user.role,
    });

    return {
      user: request.user,
      ...access_token,
    };
  }

  @Post('signup')
  @ApiBadRequestExceptionReponse(route + '/signup')
  @ApiConflictExceptionReponse(route + '/signup', 'User already exists')
  @ApiCreatedResponse({ type: UserWithJwt })
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const access_token = await this.authService.login({
      email: user.email,
      id: user.id,
      role: user.role as Role,
    });

    return {
      user,
      ...access_token,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: AuthMeResponse })
  @Get('profile')
  async getProfile(@Request() req) {
    return {
      user: req.user,
    };
  }
}
