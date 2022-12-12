import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../schemas/order.schema';
import { Products, ProductsSchema } from '../../schemas/products.schema';
import { Address, AddressSchema } from '../../schemas/address.schema';
import { CartService } from '../cart/cart.service';
import { Cart, CartSchema } from '../../schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Products.name, schema: ProductsSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService],
})
export class OrderModule {}
