import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./User.service";
import { UserType } from "./User.type";

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query((returns) => UserType)
  lesson(@Args("id") id: string) {
    return "Hello World!";
  }
  @Mutation((returns) => UserType)
  login(
    @Args("username", { type: () => String }) username: string,
    @Args("password", { type: () => String }) password: string
  ) {
    return this.userService.login(username, password);
  }
}
