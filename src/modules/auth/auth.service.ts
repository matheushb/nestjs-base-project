import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestUser } from '@/common/decorators/user/user-from-request.decorator';
import { UserService } from '../user/user.service';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByEmail(username);

    if (user && (await this.bcryptService.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: RequestUser) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
