import {Get, Req, Res, Post, Delete, JsonController, UseBefore, Body} from "routing-controllers";
import { Response } from "express";
import { UserRegisterDto } from "./dtos/UserRegisterDto";
import { UserService } from "../service/UserService";
import {Inject, Service} from "typedi";
import {Encryption} from "../infrastructure/lib/bcrypt/Encryption";
import {JsonWebToken} from "../infrastructure/lib/jsonwebtoken/JsonWebToken";

@Service()
// @UseBefore(DefaultErrorHandler)
@JsonController("/user")
export class UserController {

  private userService: UserService;

  constructor(@Inject("UserService") private readonly usersService: UserService) {}

  @Post("/register")
  async register(@Body() userRegisterDto: UserRegisterDto, @Res() res: Response) {
    const response = await this.userService.membershipRegister(userRegisterDto);
    return res.status(201).send(response);
  }

  @Delete()
  async membershipDropOut(@Req() userDto, @Res() res) {
    const response = await this.userService.membershipDropOut(userDto);
    return res.status(201).send(response);
  }

  @Get()
  async getAllMembers(@Req() userDto, @Res() res) {
    const response = await this.userService.getAllMembers(userDto);
    return res.status(201).send(response);
  }

}