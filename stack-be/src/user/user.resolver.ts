import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./User.service";
import { UserType } from "./User.type";
import { UserCreateInput } from "./user.input";

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation((returns) => UserType)
  login(
    @Args("username", { type: () => String }) username: string,
    @Args("password", { type: () => String }) password: string
  ) {
    return this.userService.login(username, password);
  }
  @Mutation((returns) => UserType)
  createUser(@Args("userCreateInput") userCreateInput: UserCreateInput) {
    return this.userService.create(userCreateInput);
  }
}
