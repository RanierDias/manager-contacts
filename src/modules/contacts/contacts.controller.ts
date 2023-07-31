import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, CreateContactRes } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Contatos')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 201,
    description: 'Caso a requisição der certo',
    type: CreateContactRes,
  })
  @ApiResponse({ status: 400, description: 'Caso mande um campo inválido' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    const userId = Number(req.user.id);

    return this.contactsService.create(userId, createContactDto);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'Caso a requisição der certo',
    type: [CreateContactRes],
  })
  @ApiBearerAuth()
  @Get()
  findAll(@Request() req) {
    const userId = Number(req.user.id);

    return this.contactsService.findAll(userId);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'Caso a requisição der certo',
    type: CreateContactRes,
  })
  @ApiResponse({ status: 404, description: 'Caso o usuário não existir' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(Number(id));
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'Caso a requisição der certo',
    type: CreateContactRes,
  })
  @ApiResponse({ status: 404, description: 'Caso o usuário não existir' })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
    @Request() req,
  ) {
    const userId = Number(req.user.id);

    return this.contactsService.update(Number(id), updateContactDto, userId);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 204,
    description: 'Caso a requisição der certo',
  })
  @ApiResponse({ status: 404, description: 'Caso o usuário não existir' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = Number(req.user.id);

    return this.contactsService.remove(Number(id), userId);
  }
}
