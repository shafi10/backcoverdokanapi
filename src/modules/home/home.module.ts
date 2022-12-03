import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from '../../schemas/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [HomeController],
  providers: [],
})
export class HomeModule {}
