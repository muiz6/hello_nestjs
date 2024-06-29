import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  reqresId: string;

  @Prop()
  avatarStorageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
