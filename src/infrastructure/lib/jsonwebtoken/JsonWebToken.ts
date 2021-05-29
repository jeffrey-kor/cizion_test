import { UserRegisterDto } from "../../../controller/dtos/UserRegisterDto";
import { sign } from "jsonwebtoken";
import { Winston } from "../winston/Winston";
import { Req } from "routing-controllers";
require("dotenv");

export class JsonWebToken {

  private logger: Promise<any>;

  constructor() {
    this.logger = new Winston().logger();
  }

  async generateJwtToken(userDto: UserRegisterDto) {
    const userInfo = { ...userDto };
    const jwtSecretKey = process.env.JWT_SECRET;

    await sign(userInfo, jwtSecretKey, {
      algorithm: "HS512",
      issuer: "Jeffrey",
      audience: userInfo.user_name,
      subject: userInfo.user_email,
      jwtid: "access_token",
      expiresIn: new Date().getTime() + 60 * 60 * 1000 / 1000
    }, (err: Error, token: string) => {
      if (err) {
        console.error(err);
        return "JWT Token 발급에 실패하였습니다.";
      }

      return token;
    });

  }

  async generateRefreshJwtToken(userDto: UserRegisterDto) {
    const userInfo = { ...userDto };
    const jwtSecretKey = process.env.JWT_SECRET;

    if (userDto.getAccessToken() > 0) {
      await sign(userInfo, jwtSecretKey, {
        algorithm: "HS512",
        issuer: "Jeffrey",
        audience: userInfo.user_name,
        subject: userInfo.user_email,
        jwtid: "refresh_token",
        expiresIn: "5h",
        }, (err: Error, token: string) => {
        if (err) {
          console.error(err);
          return "JWT Token 발급에 실패하였습니다.";
        }

        return token;
      });
    } else {
      return { message: "토큰이 아직 유효합니다."}
    }

  }

  async verify(@Req() token) {
    const bearerHeader = token.headers['authorization'];
    const jwtSecretKey = process.env.JWT_SECRET;
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      token.token = bearerToken;
    } else {
      // 토큰이 존재하지 않을때
    }
  }

}