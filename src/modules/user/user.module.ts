import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { USER_PRISMA_REPOSITORY, UserRepository } from './user.repository';
import { UserService } from './user.service';
import { BcryptModule } from '@/common/bcrypt/bcrypt.module';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [BcryptModule, PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_PRISMA_REPOSITORY,
      useClass: UserRepository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
