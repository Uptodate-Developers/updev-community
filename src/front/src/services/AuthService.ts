import { LocalStorageKeys } from "../constants/LocalStorageKeys";
import { User } from "../../api/models/User";
import { plainToClass } from "class-transformer";
import axios from "axios";
import { useCookie } from "@vue-composable/cookie";

export class AuthService {
  // 30 days
  private timeToLive = 30;

  get jwtToken(): string | null | undefined {
    const { cookie } = useCookie(LocalStorageKeys.JwtToken);

    return cookie.value;
  }
  set jwtToken(value) {
    if (value) {
      useCookie(LocalStorageKeys.JwtToken, value, { expires: this.timeToLive });
    }
  }

  get isAuthenticated(): Boolean {
    return this.jwtToken && this.user?.id ? true : false;
  }

  get user(): User | null {
    const { cookie } = useCookie(LocalStorageKeys.User);

    if (cookie.value) {
      return plainToClass(User, JSON.parse(cookie.value));
    }
    return null;
  }
  set user(value) {
    if (value) {
      useCookie(LocalStorageKeys.User, JSON.stringify(value), {
        expires: this.timeToLive
      });
    }
  }

  async logout(): Promise<Boolean> {
    if (this.user) {
      const token = this.jwtToken;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const logoutResponse = await axios.get(`/auth/logout`, config);
      sessionStorage.clear();

      let { removeCookie: removeJwtCookie } = useCookie(
        LocalStorageKeys.JwtToken
      );
      let { removeCookie: removeUserCookie } = useCookie(LocalStorageKeys.User);

      removeJwtCookie();
      removeUserCookie();
    }
    return true;
  }
}
