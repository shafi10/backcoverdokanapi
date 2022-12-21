import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  is_active: boolean;

  @Prop({ required: true })
  is_visible: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
