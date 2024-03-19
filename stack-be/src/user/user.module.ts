import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserResolver } from "./User.resolver";
import { UserService } from "./User.service";
import { User, UserSchema } from "./user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserResolver, UserService, ConfigService, JwtService],
  exports: [UserService]
})
export class UserModule {}
