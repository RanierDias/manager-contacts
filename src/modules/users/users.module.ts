import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repository/users.repository';
import { UserPrismaRepository } from './repository/users.prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: UsersRepository, useClass: UserPrismaRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
