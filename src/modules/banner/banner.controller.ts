import { Controller, Get, Query, Body, Req, Post } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerDto, GetBannerQueryDto } from '../../dto/create-banner.dto';
import { Banner } from '../../schemas/banner.schema';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async getBanner(@Query() query: GetBannerQueryDto) {
    return await this.bannerService.findBanner(query);
  }

  @Post()
  postAddress(@Body() bannerDto: BannerDto): Promise<Banner> {
    return this.bannerService.createBanner(bannerDto);
  }
}
