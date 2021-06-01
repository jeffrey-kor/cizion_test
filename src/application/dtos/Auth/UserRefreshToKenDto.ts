export class UserRefreshToKenDto {
  private user_id: number;
  private user_name: string;
  private user_email: number;
  private token?: string;

  get getUserId() { return this.user_id; }
  get getUserName() { return this.user_name; }
  get getUserEmail() { return this.user_email; }
  get getUserToken() { return this.token; }
}