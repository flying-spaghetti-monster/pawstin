import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoriesDto } from './dto/get-category.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createCategory(@Args('createCategoryDto') createCategoryDto: CreateCategoryDto) {
    await this.categoriesService.create(createCategoryDto);
    return true;
  }

  @Query(() => [Object], { name: 'categories' })
  async findAll(@Args('dto', { type: () => GetCategoriesDto, nullable: true }) dto: GetCategoriesDto) {
    return this.categoriesService.findAll(dto);
  }

  @Query(() => Object, { name: 'category' })
  async findOne(@Args('slug', { type: () => Int }) slug: string) {
    return this.categoriesService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.update(id, updateCategoryDto);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    await this.categoriesService.remove(id);
    return true;
  }
}
