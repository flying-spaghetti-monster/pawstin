import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createProduct(@Args('createProductDto') createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
    return true;
  }

  @Query(() => [Object], { name: 'products' })
  async findAll(@Args('dto', { type: () => GetProductsDto, nullable: true }) dto: GetProductsDto) {
    return this.productsService.findAll(dto);
  }

  @Query(() => Object, { name: 'product' })
  async findOne(@Args('slug', { type: () => String }) slug: string) {
    return this.productsService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductDto') updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.update(id, updateProductDto);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    await this.productsService.remove(id);
    return true;
  }
}
