import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptModule } from '@/common/bcrypt/bcrypt.module';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import {
  USER_PRISMA_REPOSITORY,
  UserRepository,
} from './repository/user-prisma.repository';
import { UserPrismaMapper } from './mapper/user-prisma.mapper';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { USER_MAPPER } from './mapper/user.mapper';

@Module({
  imports: [BcryptModule, PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_MAPPER,
      useClass: UserPrismaMapper,
    },
    {
      provide: USER_PRISMA_REPOSITORY,
      useFactory: (prismaService: PrismaService, mapper: UserPrismaMapper) => {
        return new UserRepository(prismaService, mapper);
      },
      inject: [PrismaService, USER_MAPPER],
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
