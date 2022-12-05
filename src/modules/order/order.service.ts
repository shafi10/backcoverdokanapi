import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Order, OrderDocument } from '../../schemas/order.schema';
import { Products, ProductsDocument } from '../../schemas/products.schema';
import { Address, AddressDocument } from '../../schemas/address.schema';
import { OrderDto, UpdateOrder } from 'src/dto/create-order.dto';
import jwt_decode from 'jwt-decode';
import { Request } from 'express';
import { discountPriceCalculation } from 'utils/discount';
import { GetStatus } from 'utils/types';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}
  async createOrder(order: OrderDto, req: Request): Promise<Order> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    const { newProduct, totalPrice, totalOrginalPrice } =
      await this.getProductDetails(order?.products);

    const newAddress = {
      ...order,
      orderStatus: 'Pending',
      orderAmount: totalPrice,
      originalAmount: totalOrginalPrice,
      userId: decode?.user?.id,
    };
    const newOrder = new this.orderModel(newAddress);
    return await newOrder.save();
  }

  async getOrderInfo(id: string): Promise<any> {
    const info = await this.orderModel.findById(id);
    if (!info) {
      return {
        status: 'Product not found',
      };
    }
    const pInfo = info.toObject();
    const addressInfo = await this.addressModel.findById(pInfo?.address_id);
    const { newProduct, totalPrice, totalOrginalPrice } =
      await this.getProductDetails(pInfo?.products);
    return {
      ...pInfo,
      products: newProduct,
      address: addressInfo,
      totalPrice,
      totalOrginalPrice,
    };
  }

  async getProductDetails(products) {
    const newProduct = [];
    let totalPrice = 0;
    let totalOrginalPrice = 0;
    for (let i = 0; i < products?.length; i++) {
      const pInfo = await this.productModel.findById(products[i]?.productId);
      // let pUnit = pInfo?.unit_prices?.find(
      //   (data) => data?.unit === products[i]?.unit,
      // );
      const orderPrice = discountPriceCalculation(pInfo, pInfo?.price);
      const discountPrice = orderPrice * products[i]?.quantity;
      const originalPrice = pInfo?.price * products[i]?.quantity;

      totalPrice += discountPrice;
      totalOrginalPrice += originalPrice;

      const info = {
        ...products[i],
        ...pInfo.toObject(),
        discountPrice: discountPrice,
        originalPrice: originalPrice,
      };
      newProduct.push(info);
    }
    return { newProduct, totalPrice, totalOrginalPrice };
  }

  async getOrders(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  async getUserOrders(req: Request): Promise<Order[]> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    return await this.orderModel.find({ userId: decode?.user.id });
  }

  async updateStatus(id: string, updateDto: UpdateOrder): Promise<GetStatus> {
    try {
      await this.orderModel.findByIdAndUpdate(id, updateDto, {
        new: true,
      });
      return {
        status: '200',
        message: 'Update order status',
      };
    } catch (error) {}
  }

  async cancelOrder(id: string): Promise<GetStatus> {
    try {
      const updateDto = {
        orderStatus: 'Canceled',
        isActive: false,
      };
      await this.orderModel.findByIdAndUpdate(id, updateDto, {
        new: true,
      });
      return {
        status: '200',
        message: 'Cancel order successful',
      };
    } catch (error) {}
  }
}
