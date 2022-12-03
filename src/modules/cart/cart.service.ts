import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../../schemas/cart.schema';
import { Products, ProductsDocument } from '../../schemas/products.schema';
import { CartDto } from '../../dto/create-cart.dto';
import jwt_decode from 'jwt-decode';
import { Request } from 'express';
import { GetStatus } from 'utils/types';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
  ) {}

  async createCart(cartInfo: CartDto, req: Request): Promise<GetStatus> {
    try {
      let decode: any = jwt_decode(req?.headers?.authorization);
      let isExists = await this.cartModel.findOne({ userId: decode?.user?.id });
      if (isExists) {
        let isProductExits = isExists?.productList.findIndex(
          (item) => item?.productId === cartInfo?.productId,
        );
        let prodList = [];
        if (isProductExits !== -1) {
          isExists?.productList.splice(isProductExits, 1, cartInfo);
          prodList = [...isExists?.productList];
        } else {
          prodList = [...isExists?.productList, cartInfo];
        }

        let updateCart = {
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
        let newCart = {
          userId: decode?.user?.id,
          productList: [
            {
              quantity: cartInfo?.quantity,
              productId: cartInfo?.productId,
              unit: cartInfo?.unit,
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
      let decode: any = jwt_decode(req?.headers?.authorization);
      const cartList = await this.cartModel
        .findOne({ userId: decode?.user?.id })
        .select('-userId');

      let ProductList = [];
      for (let i = 0; i < cartList.productList.length; i++) {
        const info = await this.productModel.findOne({
          _id: cartList.productList[i].productId,
        });

        let newObj = {
          productInfo: info,
          cartInfo: cartList.productList[i],
        };

        ProductList.push(newObj);
      }

      let resObj = {
        _id: cartList?._id,
        productList: ProductList,
      };

      return resObj;
    } catch (error) {}
  }

  async deleteCartItem(pId: string, req: Request): Promise<GetStatus> {
    try {
      let decode: any = jwt_decode(req?.headers?.authorization);
      let isExists = await this.cartModel.findOne({ userId: decode?.user?.id });

      let isProductExits = isExists?.productList.findIndex(
        (item) => item?.productId === pId,
      );
      isExists?.productList.splice(isProductExits, 1);

      let updateCart = {
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
        message: 'Remove cart successful',
      };
    } catch (error) {}
  }

  async delete(id: string): Promise<Cart> {
    return await this.cartModel.findByIdAndRemove(id);
  }
}
