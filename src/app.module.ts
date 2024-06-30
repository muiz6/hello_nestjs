import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { MqModule } from './mq/mq.module';
import { StorageModule } from './storage/storage.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';

@Module({
  imports: [
    EmailModule,
    MqModule,
    StorageModule,
    UserModule,
    MongooseModule.forRoot(config.MONGO_CONSTR),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
