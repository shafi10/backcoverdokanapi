import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Auth } from './auth.schema';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ required: true })
  address_name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  userId: Auth;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
