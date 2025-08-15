import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductsIndex } from './init-elastic';

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

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly prisma: PrismaService,
  ) { }

  async onModuleInit() {
    await createProductsIndex(this.elasticsearchService);
    await this.indexAllProducts();
  }

  async indexAllProducts() {
    const products = await this.prisma.products.findMany();
    const body = products.flatMap((doc) => [
      { index: { _index: this.index, _id: doc.id } },
      doc,
    ]);

    await this.elasticsearchService.bulk({ refresh: true, body });
    console.log(`Indexed ${products.length} products`);
  }

  async searchByNameAndDescription(query: string) {
    return this.elasticsearchService.search<Product>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query,
            fields: ['product_name', 'description'],
            fuzziness: 'AUTO',
          },
        },
      },
    });
  }
}
