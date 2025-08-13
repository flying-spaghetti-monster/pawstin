import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import { ProductSearchService } from './product.search.service';
import { ProductSearchController } from './product.search.controller';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    ProductSearchController
  ],
  providers: [
    SearchService,
    ProductSearchService
  ],
  exports: [
    SearchService,
    ProductSearchService
  ],
})

export class SearchModule { }
