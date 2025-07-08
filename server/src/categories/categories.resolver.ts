import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoriesDto } from './dto/get-category.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CategoryListResponse } from './dto/category-list.response';
import { Category } from './dto/category.model';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) { }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => Category, { name: 'createCategory' })
  async createCategory(@Args('createCategoryDto') createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Query(() => CategoryListResponse, { name: 'findAll' })
  async findAll(@Args('dto', { type: () => GetCategoriesDto, nullable: true }) dto: GetCategoriesDto): Promise<CategoryListResponse> {
    return this.categoriesService.findAll(dto);
  }

  @Query(() => Category, { name: 'findOne', nullable: true })
  async findOne(@Args('slug') slug: string): Promise<Category | null> {
    return this.categoriesService.findOne(slug);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => Category, { name: 'updateCategory' })
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => Category, { name: 'removeCategory' })
  async removeCategory(@Args('id', { type: () => Int }) id: number): Promise<Category> {
    return await this.categoriesService.remove(id);
  }
}
