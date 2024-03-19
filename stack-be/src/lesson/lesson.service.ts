import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Lesson } from "./lesson.schema";
import { Model } from "mongoose";

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson.name) private userModel: Model<Lesson>) {}
  create = (displayName: string): Promise<Lesson> => {
    const item = new this.userModel({ displayName });
    return item.save();
  };
  findById = async (id: string) => {
    let status = true;
    let data = { displayName: "" };
    const item = await this.userModel.findById(id);
    if (item) {
      data = item;
    } else {
      status = false;
    }
    return {
      status,
      data
    };
  };
}
