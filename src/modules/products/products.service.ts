import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from '../../schemas/products.schema';
import { Category, CategoryDocument } from '../../schemas/category.schema';
import { CreateProductsDto } from '../../dto/create-products.dto';
import {
  GetProductsQueryDto,
  GetProductsQuery,
} from 'src/dto/query-products.dto';
import { GetStatus } from 'utils/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async createProduct(product: CreateProductsDto): Promise<Products> {
    try {
      let newPInfo = {
        ...product,
        slug:
          product?.name + product?.manufacturer_name + product?.generic_name,
      };
      const newProduct = new this.productModel(newPInfo);
      return await newProduct.save();
    } catch (error) {
      throw new HttpException('Request is invalid', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllProducts(
    query: GetProductsQuery,
  ): Promise<{ categoryInfo: Category; productsList: Products[] }[]> {
    const categoryList = await this.categoryModel.find({
      is_active: true,
      is_visible: true,
    });
    // const activeCatIds = categoryList.map((data) => data?._id);
    // return await this.productModel
    //   .find({
    //     categoryId: { $in: activeCatIds },
    //   })
    //   .limit(query?.limit);

    const productsListbyCategories = [];
    for (let i = 0; i < categoryList?.length; i++) {
      const products = await this.productModel
        .find({ categoryId: categoryList[i]._id, isActive: true })
        .limit(+query?.limit);
      const newList = {
        categoryInfo: categoryList[i],
        productsList: products,
      };
      productsListbyCategories.push(newList);
    }
    return productsListbyCategories;
  }

  async findOne(
    id: string,
  ): Promise<{ product: Products; relatedProducts: Products[] }> {
    const product = await this.productModel.findOne({ _id: id });
    const relatedProducts = await this.productModel.find({
      generic_name: product?.generic_name,
    });
    return {
      product: product,
      relatedProducts: relatedProducts,
    };
  }

  async findProductsByCategory(
    catId: string,
    query: GetProductsQueryDto,
  ): Promise<Products[]> {
    return await this.productModel
      .find({ categoryId: catId, isActive: true })
      .skip(query?.skip)
      .limit(query?.limit);
  }

  async delete(id: string): Promise<Products | GetStatus> {
    const product = await this.productModel.findById(id);
    if (product) {
      await this.productModel.findByIdAndRemove(id);
      return {
        status: 'Success',
        message: 'Delete Product Successful',
      };
    }
    throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
  }

  async update(id: string, item: CreateProductsDto): Promise<Products> {
    const product = await this.productModel.findById(id);
    if (product) {
      return await this.productModel.findByIdAndUpdate(id, item, {
        new: true,
      });
    }
    throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
  }

  async disableProduct(id: string): Promise<Products | GetStatus> {
    const isDisable = {
      isActive: false,
    };
    const product = await this.productModel.findById(id);
    if (product) {
      await this.productModel.findByIdAndUpdate(id, isDisable, {
        new: true,
      });
      return {
        status: 'Success',
        message: 'Deactive Product Successful',
      };
    }
    throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
  }
}
