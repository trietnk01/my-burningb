import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { compareSync } from "bcryptjs";
import { Model } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
    private confService: ConfigService
  ) {}
  login = async (username: string, password: string) => {
    let status = false;
    let message = "";
    let data = null;
    let userItem: any = await this.userModel.findOne({ username });
    if (userItem) {
      let token = "";
      const checkIsvalidPassword = compareSync(password, userItem.password);
      if (checkIsvalidPassword) {
        const payload = {
          sub: "token login",
          iss: "from server",
          _id: userItem._id,
          name: userItem.displayName,
          email: userItem.email
        };
        token = this.jwt.sign(payload, {
          secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
          expiresIn: this.confService
            .get<string>("JWT_ACCESS_EXPIRE")
            .toString()
        });
        await this.userModel.updateOne({ _id: userItem.id }, { token });
        status = true;
      }
      data = {
        _id: userItem._id,
        username: userItem.username,
        email: userItem.email,
        displayName: userItem.displayName,
        token
      };
    }
    return {
      status,
      message,
      data
    };
  };
}
