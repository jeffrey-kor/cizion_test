import { IsNotEmpty, Length } from "class-validator";
import { UserInterface } from "../../domain/interfaces/User.interface";
import { Service } from "typedi";

@Service()
export class UserRegisterDto implements UserInterface {

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

  @IsNotEmpty()
  @Length(50, 100)
  public password_salt: string;


  get getUserId(): number { return this.user_id; }
  get getUserName(): string { return this.user_name; }
  get getUserPassword(): string { return this.user_password; }
  get getUserPhone(): string { return this.user_phone; }
  get getUserEmail(): string { return this.user_email; }
  get getUserAddress(): string { return this.user_address; }
  get getPasswordSalt(): string { return this.password_salt; }
}