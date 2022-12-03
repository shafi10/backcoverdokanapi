import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BannerDocument = Banner & Document;

@Schema()
export class Banner {
  @Prop()
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
