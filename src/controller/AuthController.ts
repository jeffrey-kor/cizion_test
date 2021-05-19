import { Get, ExpressMiddlewareInterface, Post, Controller, Body, Req, Res } from "routing-controllers";
import { UserLoginDto } from "./dtos/UserLoginDto";
import { AuthService } from "../service/AuthService";

// import {Service} from "typedi";

@Controller("/auth")
export class AuthController {

  private authService: AuthService;

  constructor(private readonly authServies: AuthService) {
    this.authService = authServies; // di가 없어서 위에 선언한 변수랑 같은 참조라고 생각하나봄
  }

  @Get("auth")
  async test() {
    return "Hello, World!, This is Auth Controller";
  }

  @Post("/login")
  async login(@Req() userLoginDto: UserLoginDto, @Res() res) {
    const loginUser = await this.authService.login(userLoginDto);
    res.status(200).json(loginUser);
  }

  @Post()
  async logout() {}


  // middleware 고려
}