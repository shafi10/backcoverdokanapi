import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CouponDocument = Coupon & Document;

@Schema()
export class Coupon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
