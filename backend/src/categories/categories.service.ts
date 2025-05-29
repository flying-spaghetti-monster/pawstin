import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCategoriesDto } from './dto/get-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateCategoryDto) {
    return this.prisma.categories.create({
      data,
    });
  }

  async findAll(dto: GetCategoriesDto) {
    const args: any = {};
    if (dto.take) {
      args.skip = dto.page ? (dto.page - 1) * dto.take : 0;
      args.take = dto.take;
    }

    if (dto.isActive) {
      args.where = {
        isActive: dto.isActive
      }
    }

    const categories = await this.prisma.categories.findMany(args);
    const totalCategories = await this.prisma.categories.count();

    return {
      categories,
      totalCategories,
      totalPages: dto.take ? Math.ceil(totalCategories / dto.take) : null,
    };
  }

  findOne(slug: string) {
    return this.prisma.categories.findUnique({
      where: { slug },
      include: {
        products: {
          where: {
            isActive: true, //TODO: fix for admin panel
          },
          select: {
            id: true,
            product_name: true,
            slug: true,
            price: true,
            discont_price: true,
            in_stock: true,
          },
        },
      },
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
