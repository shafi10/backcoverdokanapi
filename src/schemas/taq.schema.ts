import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaqDocument = Taq & Document;

@Schema()
export class Taq {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  is_active: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const TaqSchema = SchemaFactory.createForClass(Taq);
