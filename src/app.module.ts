import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'config';
import { ProductsModule } from './modules/products/products.module';
import { AddressModule } from './modules/address/address.module';
import { SearchModule } from './modules/search/search.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { BannerModule } from './modules/banner/banner.module';
import { HomeModule } from './modules/home/home.module';
import { AdminModule } from './modules/admin/admin.module';
import { TaqModule } from './modules/taq/taq.module';

@Module({
  imports: [
    HomeModule,
    AuthModule,
    MongooseModule.forRoot(config.dbURL),
    ProductsModule,
    AddressModule,
    SearchModule,
    CategoryModule,
    CartModule,
    OrderModule,
    BannerModule,
    TaqModule,
    AdminModule,
  ],
})
export class AppModule {}
