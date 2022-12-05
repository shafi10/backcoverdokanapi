import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../../schemas/category.schema';
import { CategoryDto, GetCategoryQueryDto } from 'src/dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async createCategory(category: CategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }

  async findAllCategory(query: GetCategoryQueryDto): Promise<Category[]> {
    return await this.categoryModel
      .find({ is_active: true, is_visible: true })
      .limit(+query?.limit);
  }

  async delete(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndRemove(id);
  }

  async update(id: string, address: CategoryDto): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, address, {
      new: true,
    });
  }
}
