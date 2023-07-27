import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsRepository } from './repository/contacts.repository';
import { ContactPrismaRepository } from './repository/contacts.prisma.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    { provide: ContactsRepository, useClass: ContactPrismaRepository },
  ],
})
export class ContactsModule {}
