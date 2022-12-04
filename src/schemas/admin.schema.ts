import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document,Schema as MongooseSchema } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: MongooseSchema.Types.Array })
  roles: string[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
