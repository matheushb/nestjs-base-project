import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from './repository/user.repository.interface';
import { User } from './entity/user.entity';
import { UserFilterParams } from './dtos/find-all-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(body: CreateUserDto) {
    const userExists = await this.findByEmail(body.email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const user = new User(body);

    user.password = await this.bcryptService.hash(user.password);

    return await this.userRepository.create(user);
  }

  async findAll(pagination: UserFilterParams) {
    return await this.userRepository.findAll(pagination);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, body: UpdateUserDto) {
    const user = await this.findOne(id);

    const createdUser = new User({
      id: user.id,
      name: body.name ?? user.name,
      email: body.email ?? user.email,
      password: body.password ?? user.password,
      created_at: user.created_at,
      updated_at: new Date(),
    });

    if (createdUser.password) {
      createdUser.password = await this.bcryptService.hash(
        createdUser.password,
      );
    }

    return await this.userRepository.update(createdUser);
  }

  async delete(id: string) {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
