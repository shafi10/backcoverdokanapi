import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Taq, TaqDocument } from '../../schemas/taq.schema';
import { TaqDto, GetAllTaqQueryDto } from 'src/dto/create-taq.dto';

@Injectable()
export class TaqService {
  constructor(@InjectModel(Taq.name) private taqModel: Model<TaqDocument>) {}
  async createCategory(taqDto: TaqDto): Promise<Taq> {
    const newCategory = new this.taqModel(taqDto);
    return await newCategory.save();
  }

  async findListOfCategory(query: GetAllTaqQueryDto): Promise<Taq[]> {
    return await this.taqModel
      .find()
      .sort({ createdAt: 'descending' })
      .skip(+query?.skip)
      .limit(+query?.limit);
  }

  async delete(id: string): Promise<Taq> {
    return await this.taqModel.findByIdAndRemove(id);
  }

  async update(id: string, taqDto: TaqDto): Promise<Taq> {
    return await this.taqModel.findByIdAndUpdate(id, taqDto, {
      new: true,
    });
  }
}
