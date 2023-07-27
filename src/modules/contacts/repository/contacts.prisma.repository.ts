import { PrismaService } from 'src/database/prisma.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';
import { ContactsRepository } from './contacts.repository';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { ContactsOfUsers } from '@prisma/client';

@Injectable()
export class ContactPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, payload: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, payload);

    const contactCreated: Contact = await this.prisma.contact.create({
      data: { ...contact, createdBy: userId },
    });

    const contactToUser = await this.prisma.contactsOfUsers.create({
      data: { userId, contactId: contactCreated.id },
    });

    return plainToInstance(Contact, contactCreated);
  }

  async createRelationship(
    userId: number,
    payload: CreateContactDto,
  ): Promise<Contact> {
    const contact: Contact = await this.prisma.contact.findUnique({
      where: { phone: payload.phone },
    });

    const contactToUser = await this.prisma.contactsOfUsers.create({
      data: {
        userId,
        contactId: contact.id,
      },
    });

    return plainToInstance(Contact, contact);
  }

  async findAll(userId: number): Promise<Contact[]> {
    const contacts: Contact[] = await this.prisma.contact.findMany({
      where: { sellers: { some: { userId } } },
    });

    return plainToInstance(Contact, contacts);
  }

  async find(id: number): Promise<Contact> {
    const contact: Contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    return plainToInstance(Contact, contact);
  }

  async findByRelationship(
    id: number,
    userId: number,
  ): Promise<ContactsOfUsers> {
    const contact = await this.prisma.contactsOfUsers.findFirst({
      where: { userId, contactId: id },
    });

    return contact;
  }

  async findByNumber(number: string): Promise<Contact> {
    const contact: Contact = await this.prisma.contact.findUnique({
      where: { phone: number },
    });

    return plainToInstance(Contact, contact);
  }

  async update(id: number, payload: UpdateContactDto): Promise<Contact> {
    const contactUpdated: Contact = await this.prisma.contact.update({
      where: { id },
      data: { ...payload },
    });

    return plainToInstance(Contact, contactUpdated);
  }

  async delete(id: number, userId: number): Promise<void> {
    const contact = await this.prisma.contactsOfUsers.findFirst({
      where: { contactId: id, userId },
    });

    await this.prisma.contactsOfUsers.delete({ where: { id: contact.id } });
  }
}
