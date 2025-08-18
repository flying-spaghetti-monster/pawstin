import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductsIndex } from './init-elastic';
import { Products } from '@prisma/client';
import { SearchService } from './search.service';

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
    private readonly searchService: SearchService,
    private readonly prisma: PrismaService,
  ) { }

  async onModuleInit() {
    await createProductsIndex(this.searchService['elasticsearchService']);
    await this.indexAllProducts();
  }

  async indexAllProducts() {
    const products = (await this.prisma.products.findMany()).filter(Boolean);
    const body = products.flatMap((p) => [
      { index: { _index: this.index, _id: p.id.toString() } },
      {
        id: p.id,
        product_name: p.product_name,
        description: p.description,
        price: p.price,
        discont_price: p.discont_price,
        in_stock: p.in_stock ?? 0,
        isActive: p.isActive,
        category_id: p.category_id,
      },
    ]);

    await this.searchService['elasticsearchService'].bulk({ refresh: true, body });
    console.log(`Indexed ${products.length} products in Elasticsearch`);
  }

  async searchProducts(query: string) {
    const { hits } = await this.searchService['elasticsearchService'].search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query,
            fields: ['product_name', 'description'],
            fuzziness: 'AUTO',
          },
        },
      } as any
    });

    return hits.hits.map((hit: any) => hit._source);
  }
}
