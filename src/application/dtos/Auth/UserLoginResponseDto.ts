import { Service } from "typedi";

@Service()
export class UserLoginResponseDto {
  private user_id: number;
  private user_email: string;
  private accessToken: string;
  private refreshToken: string;

  set setUserId(userId: number) { this.user_id = userId }
  set setUserEmail(userEmail: string) { this.user_email = userEmail; }
  set setAccessToken(accessToken: string) { this.accessToken = accessToken; }
  set setRefreshToken(refreshToken: string) { this.refreshToken = refreshToken; }
}