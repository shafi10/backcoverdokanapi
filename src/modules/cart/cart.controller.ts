import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '../../schemas/cart.schema';
import { AuthGuard } from '../../guards/auth.guard';
import { Request } from 'express';
import { CartDto } from '../../dto/create-cart.dto';
import { GetStatus } from '../../../utils/types';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(
    @Body() cartInfo: CartDto,
    @Req() req: Request,
  ): Promise<GetStatus> {
    return this.cartService.createCart(cartInfo, req);
  }

  @Get()
  async getCart(@Req() req: Request) {
    return await this.cartService.findAllCart(req);
  }

  @Delete('product/:id')
  deleteCartItem(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<GetStatus> {
    return this.cartService.deleteCartItem(id, req);
  }

  @Delete('delete')
  deleteCart(@Req() req: Request): Promise<Cart | GetStatus> {
    return this.cartService.delete(req);
  }
}
