import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  category_name: string;

  @Field()
  description: string;

  @Field()
  slug: string;

  @Field(() => String, { nullable: true })
  picture: string | null;

  @Field()
  isActive: boolean;
}