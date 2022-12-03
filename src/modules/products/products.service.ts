import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from '../../schemas/products.schema';
import { Category, CategoryDocument } from '../../schemas/category.schema';
import { CreateProductsDto } from '../../dto/create-products.dto';
import { GetProductsQueryDto } from 'src/dto/query-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async createProduct(product: CreateProductsDto): Promise<Products> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async findAllProducts(
    query: GetProductsQueryDto,
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
        .find({ categoryId: categoryList[i]._id })
        .limit(query?.limit);
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
      .find({ categoryId: catId })
      .skip(query?.skip)
      .limit(query?.limit);
  }

  async delete(id: string): Promise<Products> {
    return await this.productModel.findByIdAndRemove(id);
  }

  async update(id: string, item: CreateProductsDto): Promise<Products> {
    return await this.productModel.findByIdAndUpdate(id, item, { new: true });
  }
}