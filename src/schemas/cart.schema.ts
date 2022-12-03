import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import { Products } from './products.schema';
import { Auth } from './auth.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({
    type: [
      {
        quantity: { type: Number },
        productId: { type: String },
        unit: { type: String },
      },
    ],
  })
  productList: {
    quantity: number;
    productId: string;
    unit: String;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  userId: Auth;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
