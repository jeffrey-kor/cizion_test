import { UserLoginDto } from "../controller/dtos/UserLoginDto";
import { Body, UnauthorizedError } from "routing-controllers";
import { Encryption } from "../infrastructure/lib/bcrypt/Encryption";
import { UserRepository } from "../domain/repository/UserRepository";
import { JsonWebToken } from "../infrastructure/lib/jsonwebtoken/JsonWebToken";
import {Service} from "typedi";

@Service()
export class AuthService {

  private encryption: Encryption;
  private userRepository: UserRepository;
  private jwt: JsonWebToken;

  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwts: JsonWebToken
  ) {
    this.encryption = new Encryption();
    this.userRepository = usersRepository;
    this.jwt = jwts;
  }

  async login(@Body() userLoginDto: UserLoginDto) {
    const getUserIntoDatabase = await this.userRepository.findOne({
      where: [
        { user_id: userLoginDto.getId },
        { user_name: userLoginDto.getUsername }
      ]
    });

    const getPasswordExtractedByUser = getUserIntoDatabase.getUserPassword;

    const isPasswordEqual = await this.encryption.verifyPassword(
      userLoginDto.getPassword,
      getPasswordExtractedByUser
    );

    if (isPasswordEqual) {
      const token = this.jwt.generateJwt(getUserIntoDatabase);
      const refreshToken = this.jwt.generateRefreshJwtToken(getUserIntoDatabase);
      return { status: 200, user: { getUserIntoDatabase }, token: { accessToken: token, refreshToken: refreshToken} }
    } else {
      throw new UnauthorizedError("Password Incorrect..");
    }

  }

  async logout() {}



}