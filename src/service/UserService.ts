import { Req, Res } from "routing-controllers";
import { Builder } from "builder-pattern";
import { UserDto } from "../controller/dtos/UserDto";
import { UserRepository } from "../domain/repository/UserRepository";
import { Encryption } from "../infrastructure/lib/bcrypt/Encryption";
import { JsonWebToken } from "../infrastructure/lib/jsonwebtoken/JsonWebToken";
import {Response} from "express";

export class UserService {

  private userRepository: UserRepository;
  private encryption: Encryption;
  private jwt: JsonWebToken;

  constructor(
    private readonly usersDto: UserDto,
    private readonly usersRepository: UserRepository,
  ) {
    this.userRepository = usersRepository;
    this.encryption = new Encryption();
    this.jwt = new JsonWebToken();
  }

  async membershipRegister(userDto: UserDto): Promise<any> {
    try {
      const hashedPassword = this.encryption.hash(userDto.getUserPassword);
      const saltedPassword = this.encryption.salt(hashedPassword); // 이건 따로 저장

      const user = await Builder(UserDto)
        .setUserId(userDto.getUserId)
        .setUserName(userDto.getUserName)
        .setUserPassword(hashedPassword)
        .setUserPhone(userDto.getUserPhone)
        .setUserEmail(userDto.getUserEmail)
        .setUserAddress(userDto.getUserAddress)
        .build()

      await this.userRepository.save(user);
      const token = await this.jwt.generateJwt(user);
      const refreshToken = await this.jwt.generateRefreshJwtToken(user);
      return { user, token, refreshToken };

    } catch (e) {
      console.error(e);
    }

  }

  // async membershipDropOut() {
  //
  // }

}