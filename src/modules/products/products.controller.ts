import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../../schemas/products.schema';
import { CreateProductsDto } from '../../dto/create-products.dto';
import { GetProductsQueryDto } from 'src/dto/query-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  @Post()
  createProduct(@Body() product: CreateProductsDto): Promise<Products> {
    return this.prodService.createProduct(product);
  }

  @Get()
  async getProducts(@Query() query: GetProductsQueryDto) {
    return await this.prodService.findAllProducts(query);
  }

  @Get(':id')
  async findOne(
    @Param('id') id,
  ): Promise<{ product: Products; relatedProducts: Products[] }> {
    return this.prodService.findOne(id);
  }

  @Get('category/:catId')
  async findProducts(
    @Param('catId') catId,
    @Query() query: GetProductsQueryDto,
  ): Promise<Products[]> {
    return this.prodService.findProductsByCategory(catId, query);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Products> {
    return this.prodService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: CreateProductsDto,
    @Param('id') id,
  ): Promise<Products> {
    return this.prodService.update(id, updateProductDto);
  }
}
