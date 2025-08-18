import { Controller, Get, Query } from '@nestjs/common';
import { ProductSearchService } from './product.search.service';
import { Products } from '@prisma/client'

@Controller('search')
export class ProductSearchController {
  constructor(private readonly productSearchService: ProductSearchService) { }

  @Get()
  async searchProducts(@Query('q') query: string): Promise<Products[]> {
    return await this.productSearchService.searchProducts(query);
  }
}
