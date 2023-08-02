import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserRes } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: 'Caso der certo a requisição',
    type: CreateUserRes,
  })
  @ApiResponse({ status: 400, description: 'Caso mande um campo inválido' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: 'Caso der certo a requisição',
    type: CreateUserRes,
  })
  @ApiResponse({ status: 404, description: 'Caso o usuário não existir' })
  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Caso a requisição der certo',
    type: CreateUserRes,
  })
  @ApiResponse({ status: 404, description: 'Caso o usuário não existir' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const userId = Number(req.user.id);

    return this.usersService.update(Number(id), updateUserDto, userId);
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Caso a requisição der certo' })
  @ApiResponse({ status: 404, description: 'Caso o usuário não existir' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = Number(req.user.id);

    return this.usersService.remove(Number(id), userId);
  }
}
