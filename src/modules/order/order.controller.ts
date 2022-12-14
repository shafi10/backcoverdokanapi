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
import { AuthGuard } from '../../guards/auth.guard';
import { Request } from 'express';
import { GetStatus } from 'utils/types';
import { AdminAuthGuard } from '../../guards/admin.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  postOrder(
    @Body() order: OrderDto,
    @Req() req: Request,
  ): Promise<Order | GetStatus> {
    return this.orderService.createOrder(order, req);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  orderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderInfo(id);
  }

  @Get('/user/orders')
  @UseGuards(AuthGuard)
  getuserOrder(@Req() req: Request): Promise<Order[]> {
    return this.orderService.getUserOrders(req);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  getOrder(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Put('status/:id')
  @UseGuards(AdminAuthGuard)
  updateStatus(
    @Body() updateOrderDto: UpdateOrder,
    @Param('id') id: string,
  ): Promise<GetStatus> {
    return this.orderService.updateStatus(id, updateOrderDto);
  }

  @Put('cancel/:id')
  @UseGuards(AuthGuard)
  CancelOrder(@Param('id') id: string): Promise<GetStatus> {
    return this.orderService.cancelOrder(id);
  }
}
