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

  create(data: CreateProductDto): Promise<Products> {
    // Map CreateProductDto to ProductsCreateInput
    // Exclude category_id from data, as it's handled by the relation
    const { category_id, ...rest } = data;
    const productData: any = {
      ...rest,
      category_id: {
        connect: { id: category_id }
      }
    };
    return this.prisma.products.create({
      data: productData
    });
  }

  async findAll(dto: GetProductsDto): Promise<{ products: Partial<Products>[], totalproducts: number, totalPages: number }> {
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

    if (dto.isActive) {
      args.where = {
        isActice: dto.isActive
      }
    }

    const rawProducts = await this.prisma.products.findMany(args);
    const totalproducts = await this.prisma.products.count();
    const products: ProductsResponse[] = rawProducts.map((p: any) => ({
      ...p,
      category_slug: p.category.slug,
      category: undefined,
      category_id: undefined
    }));

    return {
      products,
      totalproducts,
      totalPages: dto.take ? Math.ceil(totalproducts / dto.take) : 0,
    };
  }


  findOne(slug: string): Promise<Products | null> {
    return this.prisma.products.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            category_name: true,
            slug: true
          }
        }
      }
    });
  }

  update(id: number, data: UpdateProductDto): Promise<Products> {
    return this.prisma.products.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number): Promise<Products> {
    return this.prisma.products.delete({
      where: { id },
    });
  }
}
