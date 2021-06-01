import { Get, ExpressMiddlewareInterface, Post, Controller, Body, Req, Res } from "routing-controllers";
import { UserLoginRequestDto } from "../dtos/Auth/UserLoginRequestDto";
import { AuthService } from "../../usecase/service/AuthService";
import { Inject, Service } from "typedi";


@Service()
@Controller("/auth")
export class AuthController {

  constructor(@Inject("AuthService") private authService: AuthService) {}

  @Post("/login")
  async login(@Req() userLoginDto: UserLoginRequestDto, @Res() res) {
    // class-validatior, class-transformer -> 역할 좀 제대로 공부
    const loginUser = await this.authService.login(userLoginDto);
    return res.status(200).json(loginUser);
  }

  @Post()
  async logout() {}

}