import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}
  async create(data: CreateUserDto) {
    const { username, email, phone } = data;
    const user = await this.repository.findByUser(username, email, phone);

    if (user) {
      const message = [];

      if (user.username == username) message.push('Username already exists.');

      if (user.email == email) message.push('Email already exists.');

      if (user.phone == phone) message.push('Phone already exists.');

      throw new NotFoundException({ message });
    }

    return await this.repository.create(data);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findByUser(credential: string) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const isEmail = emailRegex.test(credential);
    const user = isEmail
      ? await this.repository.logByEmail(credential)
      : await this.repository.logByUsername(credential);

    if (!user)
      throw new NotFoundException({ message: 'User does not exists.' });

    return user;
  }

  async findOne(id: number) {
    const user = await this.repository.find(id);

    if (!user)
      throw new NotFoundException({ message: 'User does not exists.' });

    return user;
  }

  async update(id: number, data: UpdateUserDto, userId: number) {
    const user = await this.repository.update(id, data);

    if (!user)
      throw new NotFoundException({ message: 'User does not exists.' });

    if (user.id != userId)
      throw new ForbiddenException({
        message:
          'You do not have sufficient permissions to perform this action.',
      });

    return user;
  }

  async remove(id: number, userId: number) {
    const user = await this.repository.find(id);

    if (!user)
      throw new NotFoundException({ message: 'User does not exists.' });

    if (user.id != userId)
      throw new ForbiddenException({
        message:
          'You do not have sufficient permissions to perform this action.',
      });

    return await this.repository.delete(id);
  }
}
