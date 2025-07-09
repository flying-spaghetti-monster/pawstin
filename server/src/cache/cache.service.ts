import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

  async hasKey(key: string): Promise<boolean> {
    const value = await this.cache.get(key);
    return value !== undefined && value !== null;
  }

  async getValue<T>(key: string): Promise<T | undefined> {
    return await this.cache.get(key);
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.cache.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.cache.del(key);
  }

  disconnect(): void {
    this.cache.disconnect();
  }

}
