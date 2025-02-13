import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos/create-user.dto';
import { USER_PRISMA_REPOSITORY, UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import { PrismaPaginationParams } from '@/modules/auth/decorators/pagination.decorator';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_PRISMA_REPOSITORY,
          useClass: UserRepository,
        },
        PrismaService,
        BcryptService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const user = await service.create(createUserDto);

    expect(user).toBeDefined();
    expect(user.email).toBe(createUserDto.email);
    expect(user.name).toBe(createUserDto.name);
    expect((user as any).password).toBeUndefined();

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(dbUser).toBeDefined();
    expect(dbUser.email).toBe(createUserDto.email);
    expect(dbUser.name).toBe(createUserDto.name);
    expect(dbUser.password).toBeDefined();
  });

  it('should find all users with pagination', async () => {
    const paginationParams: PrismaPaginationParams = {
      skip: 0,
      take: 10,
    };

    const response = await service.findAll(paginationParams);
    expect(response.data[0].name).toBe('Test User');

    expect(response.data.length).toBeGreaterThan(0);
    expect(response.meta.total).toBe(response.data.length);
    expect(response.meta.lastPage).toBe(1);
    expect(response.meta.currentPage).toBe(1);
    expect(response.meta.perPage).toBe(10);
    expect(response.meta.next).toBe(false);
    expect(response.meta.prev).toBe(false);
  });

  it('should find a user by id', async () => {
    const user = await service.create({
      name: 'Another User',
      email: 'another@example.com',
      password: 'password123',
    });

    const foundUser = await service.findOne(user.id);

    expect(foundUser).toBeDefined();
    expect(foundUser.email).toBe('another@example.com');
    expect(foundUser.name).toBe('Another User');
    expect((foundUser as any).password).toBeUndefined();
  });

  it('should throw not found when user doesn`t exists', async () => {
    try {
      await service.findOne('123');
    } catch (err) {
      expect(err.message).toBe('User not found');
      expect(err.response.message).toBe('User not found');
      expect(err.response.error).toBe('Not Found');
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should update a user', async () => {
    const user = await service.create({
      name: 'Update User',
      email: 'update@example.com',
      password: 'password123',
    });

    const updateUserDto = { name: 'Updated Name' };
    const updatedUser = await service.update(user.id, updateUserDto);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Updated Name');

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    expect(dbUser.name).toBe('Updated Name');
  });

  it('should throw not foudn when updating unexistant user', async () => {
    try {
      await service.update('123', { name: 'Updated Name' });
    } catch (err) {
      expect(err.message).toBe('User not found');
      expect(err.response.message).toBe('User not found');
      expect(err.response.error).toBe('Not Found');
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should delete a user', async () => {
    const user = await service.create({
      name: 'Delete User',
      email: 'delete@example.com',
      password: 'password123',
    });

    await service.delete(user.id);

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(dbUser).toBeNull();
  });

  it('should throw error when deleting unexistant user', async () => {
    try {
      await service.delete('123');
    } catch (err) {
      expect(err.message).toBe('User not found');
      expect(err.response.message).toBe('User not found');
      expect(err.response.error).toBe('Not Found');
      expect(err.response.statusCode).toBe(404);
    }
  });
});
