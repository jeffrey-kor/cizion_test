import { DeepPartial } from "typeorm";
import { User } from "../entity/User";

export interface UserInterface extends DeepPartial<User> {
  user_id: number;
  user_name: string;
  user_password: string;
  user_phone: string;
  user_email: string;
  user_address: string;
  password_salt: string;
}


