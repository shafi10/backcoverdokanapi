import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../../schemas/order.schema';
import { OrderDto, UpdateOrder } from 'src/dto/create-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { GetStatus } from 'utils/types';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  postOrder(@Body() order: OrderDto, @Req() req: Request): Promise<Order> {
    return this.orderService.createAddress(order, req);
  }

  @Get(':id')
  orderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderInfo(id);
  }

  @Get()
  getOrder(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Put('status/:id')
  updateStatus(
    @Body() updateOrderDto: UpdateOrder,
    @Param('id') id: string,
  ): Promise<GetStatus> {
    return this.orderService.updateStatus(id, updateOrderDto);
  }

  @Put('cancel/:id')
  CancelOrder(@Param('id') id: string): Promise<GetStatus> {
    return this.orderService.cancelOrder(id);
  }
}
