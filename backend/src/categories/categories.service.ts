import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateCategoryDto) {
    console.log('Creating:', data);
    return this.prisma.categories.create({
      data,
    });
  }

  async findAll(page: number = 1) {
    const categories = await this.prisma.categories.findMany({
      skip: (page - 1) * 6,
      take: 6,
    });

    const totalCategories = await this.prisma.categories.count();
    return {
      categories,
      totalCategories,
      totalPages: Math.ceil(totalCategories / 6),
    };
  }

  findOne(id: number) {
    return this.prisma.categories.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.prisma.categories.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.categories.delete({
      where: { id },
    });
  }
}
