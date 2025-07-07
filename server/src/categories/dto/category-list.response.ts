import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from './category.model';

@ObjectType()
export class CategoryListResponse {
  @Field(() => [Category])
  categories: Category[];

  @Field(() => Int)
  totalCategories: number;

  @Field(() => Int)
  totalPages: number;
}