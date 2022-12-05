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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '../../schemas/products.schema';
import { CreateProductsDto } from '../../dto/create-products.dto';
import {
  GetProductsQueryDto,
  GetProductsQuery,
} from 'src/dto/query-products.dto';
import { AdminAuthGuard } from 'src/guards/admin.guard';
import { GetStatus } from 'utils/types';

@Controller('products')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  createProduct(@Body() product: CreateProductsDto): Promise<Products> {
    return this.prodService.createProduct(product);
  }

  @Get()
  async getProducts(@Query() query: GetProductsQuery) {
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
  delete(@Param('id') id): Promise<Products | GetStatus> {
    return this.prodService.delete(id);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  update(
    @Body() updateProductDto: CreateProductsDto,
    @Param('id') id,
  ): Promise<Products> {
    return this.prodService.update(id, updateProductDto);
  }

  @Put('deactive/:id')
  @UseGuards(AdminAuthGuard)
  disableProduct(@Param('id') id): Promise<Products | GetStatus> {
    return this.prodService.disableProduct(id);
  }
}
