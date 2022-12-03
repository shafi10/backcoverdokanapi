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
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryDto, GetCategoryQueryDto } from 'src/dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  postCategory(@Body() category: CategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Get()
  async getCategories(@Query() query: GetCategoryQueryDto) {
    return await this.categoryService.findAllCategory(query);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateAddressDto: CategoryDto,
    @Param('id') id: string,
  ): Promise<Category> {
    return this.categoryService.update(id, updateAddressDto);
  }
}
