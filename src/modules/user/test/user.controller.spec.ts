import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../user.module';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SigninDto } from 'src/modules/auth/dtos/signin.dto';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import appConfig from '@/config/app-config';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
      providers: [BcryptService],
    }).compile();

    app = testModule.createNestApplication();
    appConfig(app);
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  it('/POST signup & signin', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    let id = '';

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        id = res.body.user.id;

        expect(res.body.user).toBeDefined();
        expect(res.body.user.id).toBeDefined();
        expect(res.body.user.name).toBe(createUserDto.name);
        expect(res.body.user.email).toBe(createUserDto.email);
      });

    await prisma.user.update({ where: { id }, data: { role: 'ADMIN' } });

    const signInDto: SigninDto = {
      email: createUserDto.email,
      password: createUserDto.password,
    };

    return await request(app.getHttpServer())
      .post('/auth/signin')
      .send(signInDto)
      .expect(200)
      .expect((res) => {
        authToken = res.body.access_token;
      });
  });

  it('/POST users', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test2@example.com',
      password: 'password123',
      name: 'Test User',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201)
      .expect((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe(createUserDto.email);
      });
  });

  it('/POST should throw conflict', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test2@example.com',
      password: 'password123',
      name: 'Test User',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(409)
      .expect((res) => {
        expect(res.body.message).toContain('User already exists');
      });
  });

  it('/GET users', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.meta.total).toBe(res.body.data.length);
        expect(res.body.meta.lastPage).toBe(1);
        expect(res.body.meta.currentPage).toBe(1);
        expect(res.body.meta.perPage).toBe(10);
        expect(res.body.meta.next).toBeFalsy();
        expect(res.body.meta.prev).toBeFalsy();
      });
  });

  it('/GET users/:id', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'findbyid@example.com',
        password: 'password123',
        name: 'Find By ID User',
      },
    });

    return request(app.getHttpServer())
      .get(`/users/id/${user.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe('findbyid@example.com');
      });
  });

  it('/PATCH users/:id', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'updateuser@example.com',
        password: 'password123',
        name: 'Update User',
      },
    });

    const updateUserDto = { name: 'Updated Name' };

    return request(app.getHttpServer())
      .patch(`/users/id/${user.id}`)
      .send(updateUserDto)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.name).toBe('Updated Name');
      });
  });

  it('/DELETE users/:id', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'deleteuser@example.com',
        password: 'password123',
        name: 'Delete User',
      },
    });

    return request(app.getHttpServer())
      .delete(`/users/id/${user.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);
  });

  it('/POST users', async () => {
    const invalidCreateUserDto = {
      email: 'invalidemail',
      password: 'password123',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(invalidCreateUserDto)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('email must be an email');
      });
  });
});
