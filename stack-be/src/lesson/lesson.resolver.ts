import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver()
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query((returns) => LessonType)
  lesson(@Args("id", { type: () => String }) id: string) {
    return this.lessonService.findById(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args("displayName", { type: () => String }) displayName: string
  ) {
    return this.lessonService.create(displayName);
  }
}
