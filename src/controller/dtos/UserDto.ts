import { IsNotEmpty, Length } from "class-validator";
import { UserInterface } from "../../domain/interfaces/User.interface";
import { Service } from "typedi";

@Service()
export class UserDto implements UserInterface {

  @IsNotEmpty()
  public user_id: number;

  @IsNotEmpty()
  public user_name: string;

  @IsNotEmpty()
  @Length(1, 50)
  public user_password: string;

  @IsNotEmpty()
  @Length(1, 50)
  public user_phone: string;

  @IsNotEmpty()
  @Length(1, 50)
  public user_email: string;

  @IsNotEmpty()
  @Length(1, 50)
  public user_address: string;

}