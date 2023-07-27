import { Exclude } from 'class-transformer';

export class User {
  readonly id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;
}
