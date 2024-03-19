import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LessonResolver } from "./lesson.resolver";
import { Lesson, LessonSchema } from "./lesson.schema";
import { LessonService } from "./lesson.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }])
  ],
  providers: [LessonResolver, LessonService]
})
export class LessonModule {}
