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
import { CategoryService } from './category.service';
import { Category } from '../../schemas/category.schema';
import {
  CategoryDto,
  GetAllCategoryQueryDto,
  GetCategoryQueryDto,
} from '../../dto/create-category.dto';
import { AdminAuthGuard } from '../../guards/admin.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  postCategory(@Body() category: CategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Get()
  async getCategories(@Query() query: GetCategoryQueryDto) {
    return await this.categoryService.findAllCategory(query);
  }

  @Get('/all')
  async getAllCategories(@Query() query: GetAllCategoryQueryDto) {
    return await this.categoryService.findListOfCategory(query);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  update(
    @Body() updateAddressDto: CategoryDto,
    @Param('id') id: string,
  ): Promise<Category> {
    return this.categoryService.update(id, updateAddressDto);
  }
}
