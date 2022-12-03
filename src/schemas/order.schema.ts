import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from './address.schema';
import { Auth } from './auth.schema';
import { Coupon } from './coupon.schema';
import { Products } from './products.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    type: [
      {
        quantity: { type: Number },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        unit: { type: String },
      },
    ],
  })
  products: {
    quantity: number;
    productId: Products;
    unit: string;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
  coupon_id: Coupon;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address_id: Address;

  // @Prop({ required: true })
  // deliver_fee: number;

  @Prop({ required: true })
  payment_method: string;

  @Prop({ required: true })
  orderStatus: string;

  @Prop({ required: true })
  orderAmount: number;

  @Prop({ required: true })
  originalAmount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  userId: Auth;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
