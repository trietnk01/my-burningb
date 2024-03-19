import { Field, ID, ObjectType } from "@nestjs/graphql";
@ObjectType()
class ILesson {
  @Field((type) => String)
  displayName: string;
}
@ObjectType()
export class LessonType {
  @Field((type) => Boolean)
  status: boolean;

  @Field((type) => ILesson || null)
  data: ILesson | null;
}
