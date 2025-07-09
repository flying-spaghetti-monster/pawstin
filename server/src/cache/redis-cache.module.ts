import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigFactory } from './cache.factory';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: CacheConfigFactory,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
});

export class RedisCacheModule { }
