import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credential: string, password: string) {
    const user = await this.usersService.findByUser(credential);

    if (!user) return null;

    const { id, username, password: passUserFound } = user;
    const passChecked = compareSync(password, passUserFound);

    if (passChecked) {
      return { id, username };
    }

    return null;
  }

  async login(payload: LoginDto) {
    const user = await this.usersService.findByUser(payload.credential);

    return {
      token: this.jwtService.sign(
        { user: user.username },
        { subject: String(user.id) },
      ),
    };
  }
}
