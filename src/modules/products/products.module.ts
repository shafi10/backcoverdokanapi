import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from '../../schemas/products.schema';
import { Category, CategorySchema } from '../../schemas/category.schema';
import { Taq, TaqSchema } from '../../schemas/taq.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Taq.name, schema: TaqSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
