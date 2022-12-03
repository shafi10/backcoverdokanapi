import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from '../../schemas/banner.schema';
import { BannerDto, GetBannerQueryDto } from 'src/dto/create-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  ) {}

  async findBanner(query: GetBannerQueryDto): Promise<Banner[]> {
    return await this.bannerModel.find().limit(query?.limit);
  }

  async createBanner(banner: BannerDto): Promise<Banner> {
    const newBanner = new this.bannerModel(banner);
    return await newBanner.save();
  }
}
