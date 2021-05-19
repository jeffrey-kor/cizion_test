import jwt from "jsonwebtoken";
import { UserDto } from "../../../controller/dtos/UserDto";
import { Request, Response } from "express";
import { User } from "../../../domain/entity/User";
require("dotenv");

export class JsonWebToken {

  async generateJwt(userDto: UserDto | User) {
    const userInfo = { ...userDto };
    const jwtSecretKey = process.env.JWT_SECRET;
    const options = { expiresIn: "3h", issuer: "jeffrey-world", subject: "userInfo" };
    // refresh 토큰은?
    const token = await jwt.sign(userInfo, jwtSecretKey, options, (err, token) => {
      if (err) {
        console.log(err);
      } else {
        return token;
      }
    });

    return token;
  }

  async generateRefreshJwtToken(userDto: UserDto | User) {
    const userInfo = { ...userDto };
    const jwtSecretKey = process.env.JWT_SECRET;
    const options = { expiresIn: "7d", issuer: "jeffrey-world", subject: "userInfo" };
    // refresh 토큰은?
    const token = await jwt.sign(userInfo, jwtSecretKey, options, (err, token) => {
      if (err) {
        console.log(err);
      } else {
        return token;
      }
    });

    return token;
  }

  async verify(req: Request, res: Response) {
    const extractedToken = req.headers['x-access-token'];
    const jwtSecretKey = process.env.JWT_SECRET;

    const decode = await jwt.verify(extractedToken, jwtSecretKey, (err, decoded) => {

      if (err) {
        return { status: 401, message: "유효하지 않은 토큰 입니다." }
      }

      return { status: 200, message: "유효한 토큰 입니다."} ;
    });

    return decode;
  }

  async refreshToken() {}

}