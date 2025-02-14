import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import { USER_PRISMA_REPOSITORY } from './repository/user-prisma.repository';
import { UserRepositoryInterface } from './repository/user.repository.interface';
import { User } from './entity/user.entity';
import { UserFilterParams } from './dtos/find-all-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_PRISMA_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findByEmail(createUserDto.email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const user = new User(createUserDto);

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);

    const user = new User({
      id: existingUser.id,
      name: updateUserDto.name ?? existingUser.name,
      email: updateUserDto.email ?? existingUser.email,
      password: updateUserDto.password ?? existingUser.password,
      created_at: existingUser.created_at,
      updated_at: new Date(),
    });

    if (user.password) {
      user.password = await this.bcryptService.hash(user.password);
    }

    return await this.userRepository.update(user);
  }

  async delete(id: string) {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
