export class UserLoginRequestDto {

  private user_id: number;
  private user_name: string;
  private user_password: string;
  private user_email: string;
  private token?: string;
  private refreshToken?: string;

  get getUserId() { return this.user_id; }
  get getUserName() { return this.user_name; }
  get getUserPassword() { return this.user_password; }
  get getUserEmail() { return this.user_email; }
  get getUserToken() { return this.token; }
  get getUserRefreshToken() { return this.refreshToken; }
}