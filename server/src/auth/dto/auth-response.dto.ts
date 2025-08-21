import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class AuthResponse {
  @ApiProperty()
  @Field()
  access_token: string;

  @ApiProperty()
  @Field()
  email: string;
}