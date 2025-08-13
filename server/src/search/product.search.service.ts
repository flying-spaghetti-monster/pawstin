import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Injectable()
export class ProductSearchService {
  private readonly index = 'products';

  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async searchCheapProducts(maxPrice: number) {
    return this.elasticsearchService.search<Product>({
      index: this.index,
      body: {
        query: {
          range: {
            price: {
              lte: maxPrice,
            },
          },
        },
      },
    });
  }

  async searchOutOfStockProducts() {
    return this.elasticsearchService.search<Product>({
      index: this.index,
      body: {
        query: {
          match: {
            quantity: 0,
          },
        },
      },
    });
  }
}
