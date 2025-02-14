import { EnvConfigService } from '@/common/environment/environment/env-config/env-config.service';
import { Role } from '@/modules/user/enums/role.enum';
import { UserService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly envConfigService: EnvConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getJwtSecret(),
    });
  }

  async validate(payload: {
    email: string;
    sub: string;
    role: Role;
    iat: number;
    exp: number;
  }) {
    await this.userService.findOne(payload.sub);

    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
