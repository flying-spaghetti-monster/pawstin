import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsDto } from './dto/get-products.dto';
import { Products } from '@prisma/client'


type ProductWithCategory = Products & { category: { slug: string }, category_slug: string };
type ProductsResponse = Omit<ProductWithCategory, 'category_id' | 'category'>

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  create(data) {
    return this.prisma.products.create({
      data,
    });
  }

  async findAll(dto: GetProductsDto) {
    const args: any = {
      include: {
        category: {
          select: {
            slug: true,
          },
        },
      },
    };
    if (dto.take) {
      args.skip = dto.page ? (dto.page - 1) * dto.take : 0;
      args.take = dto.take;
    }

    const rawProducts = await this.prisma.products.findMany(args);

    const totalproducts = await this.prisma.products.count();
    const products: ProductsResponse[] = rawProducts.map((p: any) => ({
      ...p,
      category_slug: p.category.slug,
      category: undefined,
      category_id: undefined
    }));
    console.log(products)
    return {
      products,
      totalproducts,
      totalPages: dto.take ? Math.ceil(totalproducts / dto.take) : null,
    };
  }

  findOne(id: number) {
    return this.prisma.products.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateProductDto) {
    return this.prisma.products.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.products.delete({
      where: { id },
    });
  }
}
