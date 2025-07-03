import { Resolver, Query } from '@nestjs/graphql';

//test GraphQL connection
@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello from GraphQL!';
  }
}
