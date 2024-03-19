import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ collection: "lesson" })
export class Lesson {
  @Prop()
  displayName: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
