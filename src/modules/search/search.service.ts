import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from '../../schemas/products.schema';
import { GetProductsSearchQueryDto } from '../../dto/query-products.dto';
import { escapeRegex } from 'utils/connect';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Products.name) private searchModel: Model<ProductsDocument>,
  ) {}

  async findsearchResults(
    query: GetProductsSearchQueryDto,
  ): Promise<Products[]> {
    if (!query?.q) {
      return [];
    }
    const regex = new RegExp(escapeRegex(query?.q), 'gi');
    return await this.searchModel
      .find({ medicine_name: { $regex: regex } })
      .skip(+query?.skip)
      .limit(+query?.limit);
  }
}
