import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GetProductsSearchQueryDto } from 'src/dto/query-products.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async getSearch(@Query() query: GetProductsSearchQueryDto) {
    return await this.searchService.findsearchResults(query);
  }
}
