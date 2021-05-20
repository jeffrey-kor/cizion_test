import * as bcrypt from "bcrypt";

export class Encryption {

  async hash(password: string) {
    password = bcrypt.hashSync(password, 12);
    return password;
  }

  async salt(password: string) {
    return bcrypt.salt(password);
  }

  async verifyPassword(requestPassword: string, savedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(requestPassword, savedPassword);
    return (match) ? true : false;
  }
}