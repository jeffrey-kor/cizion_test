import * as bcrypt from "bcrypt";

export class Encryption {

  hash(password: string) {
    password = bcrypt.hashSync(password, 12);
    return password;
  }

  salt(password: string) {
    return bcrypt.salt(password);
  }

  async verifyPassword(requestPassword: string, savedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(requestPassword, savedPassword);
    return (match) ? true : false;
  }
}