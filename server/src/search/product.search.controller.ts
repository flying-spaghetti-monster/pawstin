import { Controller, Get, Query } from '@nestjs/common';
import { ProductSearchService } from './product.search.service';
import { Products } from '@prisma/client'

@Controller('products')
export class ProductSearchController {
  constructor(private readonly productSearchService: ProductSearchService) { }

  @Get('search')
  async searchProducts(@Query('query') query: string): Promise<Products> {
    const result = await this.productSearchService.searchByNameAndDescription(query);
    return result.hits.hits.map(hit => hit._source);
  }
}
