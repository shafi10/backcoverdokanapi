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
import { TaqService } from './taq.service';
import { Taq } from '../../schemas/taq.schema';
import { AdminAuthGuard } from '../../guards/admin.guard';
import { TaqDto, GetAllTaqQueryDto } from '../../../src/dto/create-taq.dto';

@Controller('taq')
export class TaqController {
  constructor(private readonly taqService: TaqService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  postCategory(@Body() taqDto: TaqDto): Promise<Taq> {
    return this.taqService.createCategory(taqDto);
  }

  @Get()
  async getAllCategories(@Query() query: GetAllTaqQueryDto) {
    return await this.taqService.findListOfCategory(query);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  delete(@Param('id') id: string): Promise<Taq> {
    return this.taqService.delete(id);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  update(@Body() taqDto: TaqDto, @Param('id') id: string): Promise<Taq> {
    return this.taqService.update(id, taqDto);
  }
}
