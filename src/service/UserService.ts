import { Builder } from "builder-pattern";
import { UserRegisterDto } from "../controller/dtos/UserRegisterDto";
import { UserRepository } from "../domain/repository/UserRepository";
import { Encryption } from "../infrastructure/lib/bcrypt/Encryption";
import { Inject, Service } from "typedi";
import { UserInterface } from "../domain/interfaces/User.interface";
import { User } from "../domain/entity/User";

@Service()
export class UserService {

  private encryption: Encryption;

  constructor(@Inject("UserRepository") private usersRepository: UserRepository) {
    this.encryption = new Encryption();
  }

  async membershipRegister(userRegisterDto: UserRegisterDto): Promise<UserInterface> {

    const hashedPassword = await this.encryption.hash(userRegisterDto.getUserPassword);
    const saltedPassword = await this.encryption.salt(hashedPassword);

    const user = await Builder<UserInterface>(User)
      .user_id(userRegisterDto.getUserId)
      .user_name(userRegisterDto.getUserName)
      .user_password(hashedPassword)
      .user_phone(userRegisterDto.getUserPhone)
      .user_email(userRegisterDto.getUserEmail)
      .user_address(userRegisterDto.getUserAddress)
      .password_salt(saltedPassword)
      .build();

    console.log(user);

    await this.usersRepository.save(user);

    return user;

  }

  async membershipDropOut(req: UserRegisterDto) {}

  async getAllMembers(req: UserRegisterDto) {}

}