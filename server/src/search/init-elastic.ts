import { ElasticsearchService } from '@nestjs/elasticsearch';

export async function createProductsIndex(elasticsearchService: ElasticsearchService) {
  const indexName = 'products';

  const exists = await elasticsearchService.indices.exists({ index: indexName });
  if (!exists) {
    await elasticsearchService.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            product_name: { type: 'text' },
            description: { type: 'text' },
            price: { type: 'integer' },
            discont_price: { type: 'integer' },
            in_stock: { type: 'integer' },
            isActive: { type: 'boolean' },
            category_id: { type: 'integer' },
          },
        },
      } as any,
    });
    console.log(`Індекс ${indexName} створено ✅`);
  } else {
    console.log(`Індекс ${indexName} вже існує`);
  }
}