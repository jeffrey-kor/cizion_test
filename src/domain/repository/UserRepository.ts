import { EntityRepository, getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { Service } from "typedi";
import { UserDeleteDto } from "../../controller/dtos/UserDeleteDto";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findUserByEmail(userDeleteDto: UserDeleteDto) {
    return this.createQueryBuilder("user")
      .delete()
      .from(User)
      .where("user.user_id = :user_id", { user_id: userDeleteDto.getUserId })
      .andWhere("user.user_email = user_email", { user_email: userDeleteDto.getUserEmail })
      .execute()
  }

}