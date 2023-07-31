import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(payload: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByUser(
    username: string,
    email: string,
    phone: string,
  ): Promise<User>;
  abstract logByUsername(username: string): Promise<User>;
  abstract logByEmail(email: string): Promise<User>;
  abstract find(id: number): Promise<User> | undefined;
  abstract update(id: number, payload: UpdateUserDto): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
