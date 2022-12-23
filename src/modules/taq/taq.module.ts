import { Module } from '@nestjs/common';
import { TaqController } from './taq.controller';
import { TaqService } from './taq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Taq, TaqSchema } from '../../schemas/taq.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Taq.name, schema: TaqSchema }])],
  controllers: [TaqController],
  providers: [TaqService],
})
export class TaqModule {}
