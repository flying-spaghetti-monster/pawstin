import { Controller, Get, Query } from '@nestjs/common';
import { ProductSearchService } from './product.search.service';

@Controller('products')
export class ProductSearchController {
  constructor(private readonly productSearchService: ProductSearchService) { }

  @Get('cheap')
  async getCheapProducts(@Query('maxPrice') maxPrice: number) {
    const result = await this.productSearchService.searchCheapProducts(maxPrice);
    return result.hits.hits.map(hit => hit._source);
  }

  @Get('out-of-stock')
  async getOutOfStockProducts() {
    const result = await this.productSearchService.searchOutOfStockProducts();
    return result.hits.hits.map(hit => hit._source);
  }
}
