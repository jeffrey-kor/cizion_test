import {Get, Req, Res, Post, Delete, JsonController, UseBefore, Body} from "routing-controllers";
import { Response } from "express";
import { UserDto } from "./dtos/UserDto";
import { UserService } from "../service/UserService";
// import { DefaultErrorHandler } from "../infrastructure/middlewares/DefaultErrorHandler";
import { Service } from "typedi";
import { User } from "../domain/entity/User";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../domain/repository/UserRepository";
import {getRepository} from "typeorm";
import {Encryption} from "../infrastructure/lib/bcrypt/Encryption";
import {JsonWebToken} from "../infrastructure/lib/jsonwebtoken/JsonWebToken";

@Service()
// @UseBefore(DefaultErrorHandler)
@JsonController("/user")
export class UserController {

  private userService: UserService;
  private encryption: Encryption;
  private jwt: JsonWebToken;

  constructor(
    @InjectRepository() private userRepository: UserRepository,
    private readonly usersService: UserService
  ) {
    this.userService = usersService;
    this.encryption = new Encryption();
    this.jwt = new JsonWebToken();
  }

  @Get("/users")
  async test(@Body() request: Response, @Res() response: Response) {
    return "hello world!"
    // response.send("Hello, world!. This is User Controller..");
  }

  @Post("/register")
  async register(@Body() userDto: UserDto, @Res() res: Response) {
    const hashedPassword = await this.encryption.hash(userDto.user_password);
    const user = new User(
      userDto.user_id,
      userDto.user_name,
      hashedPassword,
      userDto.user_phone,
      userDto.user_email,
      userDto.user_address
    );

    const saltedPassword = this.encryption.salt(hashedPassword);
    console.log("salt: ", saltedPassword);
    const token = await this.jwt.generateJwt(user);
    console.log("token", token);
    const refreshToken = await this.jwt.generateRefreshJwtToken(user);
    console.log("refreshToken: ", refreshToken);

    return await getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
  }

  // @Delete()
  // async membershipDropOut(@Req() userDto, @Res() res) {
  //   const response = await this.userService.membershipDropOut(userDto);
  //   return res.status(201).send(response);
  // }

  // @Get()
  // async getAllMembers(@Req() userDto, @Res() res) {
  //   const response = await this.userService.getAllMembers(userDto);
  //   return res.status(201).send(response);
  // }

}