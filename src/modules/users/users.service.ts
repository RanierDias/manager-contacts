import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  async create(data: CreateUserDto) {
    const usernameExists = await this.userRepository.findByUsername(
      data.username,
    );

    if (usernameExists)
      throw new ConflictException({ username: 'Username already exists.' });

    const emailExists = await this.userRepository.findByEmail(data.email);

    if (emailExists)
      throw new ConflictException({ email: 'Email already exists' });

    return await this.userRepository.create(data);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByUser(credential: string) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const isEmail = emailRegex.test(credential);
    const user = isEmail
      ? await this.userRepository.logByEmail(credential)
      : await this.userRepository.logByUsername(credential);

    if (!user) {
      throw new NotFoundException('User does not exists.');
    }

    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw new NotFoundException('User does not exists.');
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.update(id, data);

    if (!user) {
      throw new NotFoundException('User does not exists.');
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw new NotFoundException('User does not exists.');
    }

    return await this.userRepository.delete(id);
  }
}
