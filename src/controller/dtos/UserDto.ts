import { UserInterface } from "../../domain/interfaces/User.interface";

export class UserDto implements UserInterface {

  public user_id: number;
  public user_name: string;
  public user_password: string;
  public user_phone: string;
  public user_email: string;
  public user_address: string;

  constructor(user_id: number, user_name: string, user_password: string, user_phone: string, user_email: string, user_address: string) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_password = user_password;
    this.user_phone = user_phone;
    this.user_email = user_email;
    this.user_address = user_address;
  }

  get getUserAddress(): string { return this.user_address; }
  set setUserAddress(value: string) { this.user_address = value; }

  get getUserEmail(): string { return this.user_email; }
  set setUserEmail(value: string) { this.user_email = value; }

  get getUserId(): number { return this.user_id; }
  set setUserId(value: number) { this.user_id = value; }

  get getUserName(): string { return this.user_name; }
  set setUserName(value: string) { this.user_name = value; }

  get getUserPassword(): string { return this.user_password; }
  set setUserPassword(value: string) { this.user_password = value; }

  get getUserPhone(): string { return this.user_phone; }
  set setUserPhone(value: string) { this.user_phone = value; }

}