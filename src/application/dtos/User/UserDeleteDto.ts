import { IsNotEmpty, Length } from "class-validator";
import { Service } from "typedi";

@Service()
export class UserDeleteDto {

  @IsNotEmpty()
  public user_id: number;

  @IsNotEmpty()
  @Length(50, 100)
  public user_email: string;

  get getUserId() { return this.user_id; }
  get getUserEmail() { return this.user_email; }

}