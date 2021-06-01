import { sign } from "jsonwebtoken";
import { Winston } from "../winston/Winston";
import { Req } from "routing-controllers";
import { UserLoginRequestDto } from "../../../application/dtos/Auth/UserLoginRequestDto";
require("dotenv");

export class JsonWebToken {

  async generateJwtToken(userLoginDto: UserLoginRequestDto): Promise<string> {

    const jwtSecretKey = process.env.JWT_SECRET;
    let accessToken = "";
    await sign(userLoginDto, jwtSecretKey, {
      algorithm: "HS512",
      issuer: "Jeffrey",
      audience: userLoginDto.getUserName,
      subject: userLoginDto.getUserEmail,
      jwtid: "access_token",
      expiresIn: "5h"
    }, (err: Error, token: string) => {
      if (err) {
        console.error(err);
        return "JWT Access Token 발급에 실패하였습니다.";
      }

      accessToken = token;
    });

    return accessToken;
  }

  async generateJwtRefreshToken(userLoginDto: UserLoginRequestDto): Promise<string> {
    const jwtSecretKey = process.env.JWT_SECRET;
    let refreshToken = "";
    await sign(userLoginDto, jwtSecretKey, {
      algorithm: "HS512",
      issuer: "Jeffrey",
      audience: userLoginDto.getUserName,
      subject: userLoginDto.getUserEmail,
      jwtid: "access_token",
      expiresIn: new Date().getTime() + 60 * 60 * 1000 / 1000
    }, (err: Error, token: string) => {
      if (err) {
        console.error(err);
        return "JWT refresh Token 발급에 실패하였습니다.";
      }

      refreshToken = token;
    });

    return refreshToken;
  }

  async verify(token: string): Promise<boolean> {
    // 파라미터로 들어온 토큰이 유저의 토큰이라고 판단할 수 있도록 하려면 어떻게 해야하지..
    // 1. 유저가 한명일 때는 어딘가에 저장해두고, 그냥 토큰입니다 하면 되는데,
    // 2. 유저가 100명일 때 이걸 배열? RDBMS?
    // 결국엔 레디스밖에 없구나

    return true;
  }

}