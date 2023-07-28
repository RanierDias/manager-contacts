import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, payload);

    const userCreated: User = await this.prisma.user.create({
      data: { ...user },
    });

    return plainToInstance(User, userCreated);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();

    return plainToInstance(User, users);
  }

  async findByUser(
    username: string,
    email: string,
    phone: string,
  ): Promise<User> {
    const user: User = await this.prisma.user.findFirst({
      where: { OR: [{ username }, { email }, { phone }] },
    });

    return plainToInstance(User, user);
  }

  async logByUsername(username: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  async logByEmail(email: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async find(id: number): Promise<User> {
    const user: User = await this.prisma.user.findUnique({ where: { id } });

    return plainToInstance(User, user);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user: User = await this.prisma.user.update({
      where: { id },
      data: { ...payload },
    });

    return plainToInstance(User, user);
  }

  async delete(id: number): Promise<void> {
    const user: User = await this.prisma.user.delete({ where: { id } });
  }
}
