import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repository/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private repository: ContactsRepository) {}

  async create(userId: number, createContactDto: CreateContactDto) {
    const contact = await this.repository.findByNumber(createContactDto.phone);

    if (contact) {
      const contactToUser = await this.repository.createRelationship(
        userId,
        createContactDto,
      );

      return contact;
    }

    const contactCreated = await this.repository.create(
      userId,
      createContactDto,
    );

    return contactCreated;
  }

  async findAll(userId: number) {
    const contacts = await this.repository.findAll(userId);

    return contacts;
  }

  async findOne(id: number) {
    const contact = await this.repository.find(id);

    if (!contact)
      throw new NotFoundException({ message: 'Contact not found.' });

    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto, userId: number) {
    const contact = await this.repository.find(id);

    if (!contact)
      throw new NotFoundException({ message: 'Contact does not exists.' });

    if (contact.createdBy != userId)
      throw new ForbiddenException({
        message:
          'You do not have sufficient permissions to perform this action.',
      });

    const contactUpdate = await this.repository.update(id, updateContactDto);

    return contactUpdate;
  }

  async remove(id: number, userId: number) {
    const contact = await this.repository.findByRelationship(id, userId);

    if (!contact)
      throw new NotFoundException({ message: 'Contact does not exists.' });

    return await this.repository.delete(id, userId);
  }
}
