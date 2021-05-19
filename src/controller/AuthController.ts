import { Get, ExpressMiddlewareInterface, Post, Controller } from "routing-controllers";
// import {Service} from "typedi";

@Controller()
export class AuthController {

  constructor() {}


  @Get("auth")
  async test() {
    return "Hello, World!, This is Auth Controller";
  }

  @Post()
  async login() {}

  @Post()
  async logout() {}

  @Post()
  async requestJwtRefreshToken() {}
  // middleware 고려
}