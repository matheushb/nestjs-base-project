import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaPaginationParams } from '../auth/decorators/pagination.decorator';
import { USER_PRISMA_REPOSITORY } from './user.repository';
import { IUserRepository } from '@/common/interfaces/user.repository.interface';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_PRISMA_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = !!(await this.findByEmail(createUserDto.email));

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    createUserDto.password = await this.bcryptService.hash(
      createUserDto.password,
    );

    return this.userRepository.create(createUserDto);
  }

  async findAll(pagination: PrismaPaginationParams) {
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
    await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await this.bcryptService.hash(
        updateUserDto.password,
      );
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.userRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
