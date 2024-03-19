import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
class IUser {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  username: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  phone: string;

  @Field((type) => Number)
  age: number;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  token: string;

  @Field((type) => String)
  displayName: string;
}
@ObjectType()
export class UserType {
  @Field((type) => Boolean)
  status: boolean;

  @Field((type) => String)
  message: string;

  @Field((type) => IUser)
  data: IUser;
}
