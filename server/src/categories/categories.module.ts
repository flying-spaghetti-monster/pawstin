import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesResolver } from './categories.resolver';

@Module({
  imports: [PrismaModule, CategoriesResolver],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
