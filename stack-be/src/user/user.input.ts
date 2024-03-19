import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
@InputType()
export class UserCreateInput {
  @MinLength(1)
  @Field((type) => String)
  username: string;

  @MinLength(1)
  @Field((type) => String)
  email: string;

  @MinLength(1)
  @Field((type) => String)
  password: string;

  @MinLength(1)
  @Field((type) => String)
  displayName: string;

  @MinLength(1)
  @Field((type) => String)
  phone: string;
}
