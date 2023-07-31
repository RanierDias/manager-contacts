import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto, LoginRes } from './dto/login.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiResponse({
    status: 401,
    description: 'Caso mande um campo errado ou informções inválidas',
  })
  @ApiCreatedResponse({
    description: 'Caso der certo a requisição',
    type: LoginRes,
  })
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
