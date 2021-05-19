import {Get, Req, Res, Post, Delete, JsonController, Body} from "routing-controllers";
import { Response } from "express";
import { UserDto } from "./dtos/UserDto";
import { UserService } from "../service/UserService";

// import { Service } from "typedi";

// @Service()
@JsonController()
export class UserController {

  private userService: UserService;

  constructor(private readonly usersService: UserService) {
    this.userService = usersService;
  }

  @Get("/users")
  async test(@Req() request: Response, @Res() response: Response) {
    return response.send("Hello, world!. This is User Controller..");
  }

  @Post()
  async register(@Req() userDto: UserDto, @Res() res) {
    const response = await this.userService.membershipRegister(userDto);
    return res.status(201).send(response);
  }

  @Delete()
  async membershipDropOut() {}

  @Get()
  async getAllMember() {}

}