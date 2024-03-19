import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "users" })
export class User {
  @Prop()
  _id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  displayName: string;

  @Prop()
  phone: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
