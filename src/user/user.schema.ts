import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ default: null })
  email?: string;

  @Prop({ default: null })
  firstName?: string;

  @Prop({ default: null })
  lastName?: string;

  @Prop({ default: null })
  reqresId?: string;

  @Prop({ default: null })
  avatarStorageUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
