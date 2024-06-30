import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { StorageModule } from 'src/storage/storage.module';
import { EmailModule } from 'src/email/email.module';
import { MqModule } from 'src/mq/mq.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    StorageModule,
    EmailModule,
    MqModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
