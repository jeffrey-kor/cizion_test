import * as bcrypt from "bcrypt";

export class Encryption {

  hash(password: string) {
    password = bcrypt.hashSync(password, 12);
    return password;
  }

  salt(password: string) {
    return bcrypt.salt(password);
  }

}