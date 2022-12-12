import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../../schemas/cart.schema';
import { Products, ProductsDocument } from '../../schemas/products.schema';
import { CartDto } from '../../dto/create-cart.dto';
import jwt_decode from 'jwt-decode';
import { Request } from 'express';
import { cartInfo, GetStatus } from 'utils/types';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
  ) {}

  async createCart(cartInfo: CartDto, req: Request): Promise<GetStatus> {
    try {
      const decode: any = jwt_decode(req?.headers?.authorization);
      const isExists = await this.cartModel.findOne({
        userId: decode?.user?.id,
      });
      if (isExists) {
        const isProductExits = isExists?.productList.findIndex(
          (item) => item?.productId === cartInfo?.productId,
        );
        let prodList = [];
        if (isProductExits !== -1) {
          isExists?.productList.splice(isProductExits, 1, cartInfo);
          prodList = [...isExists?.productList];
        } else {
          prodList = [...isExists?.productList, cartInfo];
        }

        const updateCart = {
          userId: decode?.user?.id,
          productList: prodList,
        };
        await this.cartModel.findByIdAndUpdate(
          isExists._id.toString(),
          updateCart,
          {
            new: true,
          },
        );
      } else {
        const newCart = {
          userId: decode?.user?.id,
          productList: [
            {
              quantity: cartInfo?.quantity,
              productId: cartInfo?.productId,
              // unit: cartInfo?.unit,
            },
          ],
        };
        new this.cartModel(newCart).save();
      }
      return {
        status: 'Success',
        message: 'Product add to cart successful',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findAllCart(req: Request): Promise<any> {
    try {
      const decode: any = jwt_decode(req?.headers?.authorization);
      const cartList = await this.cartModel
        .findOne({ userId: decode?.user?.id })
        .select('-userId');

      const ProductList = [];
      if (cartList) {
        for (let i = 0; i < cartList.productList.length; i++) {
          const info = await this.productModel.findOne({
            _id: cartList.productList[i].productId,
          });

          const productINfo = info.toObject();
          const cartINfo: cartInfo = cartList.productList[i];

          const newObj = {
            ...productINfo,
            quantity: cartINfo?.quantity,
            cartId: cartINfo?._id,
            id: cartINfo?.productId,
          };

          ProductList.push(newObj);
        }

        return ProductList;
      }
      return [];
    } catch (error) {}
  }

  async deleteCartItem(pId: string, req: Request): Promise<GetStatus> {
    try {
      const decode: any = jwt_decode(req?.headers?.authorization);
      const isExists = await this.cartModel.findOne({
        userId: decode?.user?.id,
      });

      const isProductExits = isExists?.productList.findIndex(
        (item) => item?.productId === pId,
      );
      isExists?.productList.splice(isProductExits, 1);

      const updateCart = {
        userId: decode?.user?.id,
        productList: isExists?.productList,
      };
      await this.cartModel.findByIdAndUpdate(
        isExists._id.toString(),
        updateCart,
        {
          new: true,
        },
      );
      return {
        status: 'Success',
        message: 'Removed cart Item successful',
      };
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(req: Request): Promise<Cart | GetStatus> {
    try {
      const decode: any = jwt_decode(req?.headers?.authorization);
      const isExists = await this.cartModel.findOne({
        userId: decode?.user?.id,
      });
      if (isExists) {
        await this.cartModel.findByIdAndRemove(isExists._id.toString());
        return {
          status: 'Success',
          message: 'Removed cart successfully',
        };
      } else {
        return {
          status: 'Error',
          message: 'Invalid request',
        };
      }
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
  }
}
