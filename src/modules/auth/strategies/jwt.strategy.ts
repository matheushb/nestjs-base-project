import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { Role } from '../../../modules/user/entity/user.entity';
import { UserService } from '../../../modules/user/user.service';
import env from '../../../common/config/env-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
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
