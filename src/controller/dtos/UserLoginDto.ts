export class UserLoginDto {

  private _id: number;
  private _username: string;
  private _password: string;

  constructor(id, username, password) {
    this._id = id;
    this._username = username;
    this._password = password;
  }

  get getId(): number { return this._id; }
  set setId(value: number) { this._id = value; }

  get getUsername(): string { return this._username; }
  set setUsername(value: string) { this._username = value; }

  get getPassword(): string { return this._password; }
  set setPassword(value: string) { this._password = value; }

}