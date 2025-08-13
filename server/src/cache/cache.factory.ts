import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheConfig, CacheConfigName } from '../configs/cache.config';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-ioredis';

@Injectable()
export class CacheConfigFactory implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  async createCacheOptions(): Promise<CacheModuleOptions> {
    const cacheConfig =
      this.configService.getOrThrow<CacheConfig>(CacheConfigName);

    return {
      // store: redisStore, // ✅ не Redis instance
      host: cacheConfig.host,
      port: cacheConfig.port,
      password: cacheConfig.password,
      ttl: cacheConfig.ttl,
    };
  }
}