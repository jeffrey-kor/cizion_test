import { EntityRepository, getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { Service } from "typedi";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {}