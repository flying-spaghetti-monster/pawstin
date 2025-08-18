import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import { ProductSearchService } from './product.search.service';
import { ProductSearchController } from './product.search.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'), // e.g., 'http://localhost:9200'
        // if using a cloud service
        // cloud: {
        //   id: '<cloud-id>'
        // },
        // auth: {
        //   username: 'elastic',
        //   password: 'changeme'
        // }
      }),
      inject: [ConfigService],
    }),
    PrismaModule
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
