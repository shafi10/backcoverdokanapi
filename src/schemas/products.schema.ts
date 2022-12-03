import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from './category.schema';

export type ProductsDocument = Products & mongoose.Document;

// @Schema()
// export class UnitPrice {
//   @Prop({ required: true })
//   price: number;

//   @Prop()
//   unit: string;

//   @Prop()
//   unit_size: number;
// }

@Schema()
export class Gallery {
  @Prop()
  original: string;
}

@Schema()
export class Products {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: Category;

  @Prop({ required: true })
  discount_type: string;

  @Prop({ required: true })
  generic_name: string;

  @Prop({ required: true })
  is_available: boolean;

  @Prop({ required: true })
  discount_value: number;

  @Prop({ required: true })
  is_discountable: boolean;

  @Prop({ required: true })
  manufacturer_name: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  strength: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  price: number;

  // @Prop({ required: true })
  // unit_prices: UnitPrice[];

  @Prop()
  gallery: Gallery[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
