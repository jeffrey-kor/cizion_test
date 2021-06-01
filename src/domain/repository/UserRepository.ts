import { EntityRepository, getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { Service } from "typedi";
import { UserDeleteDto } from "../../application/dtos/User/UserDeleteDto";
import { UserLoginRequestDto } from "../../application/dtos/Auth/UserLoginRequestDto";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findUserByEmail(userDeleteDto: UserDeleteDto) {
    return this.createQueryBuilder("user")
      .delete()
      .from(User)
      .where("user.user_id = :user_id", { user_id: userDeleteDto.getUserId })
      .andWhere("user.user_email = user_email", { user_email: userDeleteDto.getUserEmail })
      .execute();
  }

  async findOneUserForLogin(userLoginDto: UserLoginRequestDto): Promise<User> {
    return await this.createQueryBuilder("user")
      .where("user.user_email = :user_email", { user_email: userLoginDto.getUserEmail })
      .getOne();
  }



}