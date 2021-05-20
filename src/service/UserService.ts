import { Builder } from "builder-pattern";
import { UserDto } from "../controller/dtos/UserDto";
import { UserRepository } from "../domain/repository/UserRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Encryption } from "../infrastructure/lib/bcrypt/Encryption";
import { JsonWebToken } from "../infrastructure/lib/jsonwebtoken/JsonWebToken";
import { Service } from "typedi";
import { User } from "../domain/entity/User";
import { getRepository } from "typeorm";

@Service()
export class UserService {

  private encryption: Encryption;
  private jwt: JsonWebToken;

  constructor(@InjectRepository() private usersRepository: UserRepository) {
    this.encryption = new Encryption();
    this.jwt = new JsonWebToken();
  }

  async membershipRegister(userDto: UserDto) {

    // const hashedPassword = await this.encryption.hash(userDto.user_password);
    const user = new User(
      userDto.user_id,
      userDto.user_name,
      userDto.user_password,
      userDto.user_phone,
      userDto.user_email,
      userDto.user_address
    );

    // const saltedPassword = this.encryption.salt(hashedPassword);
    // const token = await this.jwt.generateJwt(user);
    // const refreshToken = await this.jwt.generateRefreshJwtToken(user);

    return await getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
  }

  async membershipDropOut(req: UserDto) {}

  async getAllMembers(req: UserDto) {}

}