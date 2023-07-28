import { ContactsOfUsers } from '@prisma/client';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract create(userId: number, payload: CreateContactDto): Promise<Contact>;
  abstract createRelationship(
    userId: number,
    payload: CreateContactDto,
  ): Promise<Contact>;
  abstract findAll(userId: number): Promise<Contact[]>;
  abstract find(id: number): Promise<Contact>;
  abstract findByRelationship(
    id: number,
    userId: number,
  ): Promise<ContactsOfUsers>;
  abstract findByNumber(number: string): Promise<Contact>;
  abstract update(id: number, payload: UpdateContactDto): Promise<Contact>;
  abstract delete(id: number, userId: number): Promise<void>;
}
