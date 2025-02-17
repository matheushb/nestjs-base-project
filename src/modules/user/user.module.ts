import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptModule } from '@/common/bcrypt/bcrypt.module';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { UserPrismaRepository } from './repository/user-prisma.repository';
import { UserPrismaMapper } from './mapper/user-prisma.mapper';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { USER_MAPPER } from './mapper/user.mapper';
import { USER_REPOSITORY } from './repository/user.repository.interface';

@Module({
  imports: [BcryptModule, PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_MAPPER,
      useFactory: () => {
        return new UserPrismaMapper();
      },
    },
    {
      provide: USER_REPOSITORY,
      useFactory: (prismaService: PrismaService, mapper: UserPrismaMapper) => {
        return new UserPrismaRepository(prismaService, mapper);
      },
      inject: [PrismaService, USER_MAPPER],
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
