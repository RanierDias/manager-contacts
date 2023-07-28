import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [UsersModule, AuthModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
