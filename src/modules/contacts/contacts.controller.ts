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
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    const userId = Number(req.user.id);

    return this.contactsService.create(userId, createContactDto);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Request() req) {
    const userId = Number(req.user.id);

    return this.contactsService.findAll(userId);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(Number(id));
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
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
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = Number(req.user.id);

    return this.contactsService.remove(Number(id), userId);
  }
}
