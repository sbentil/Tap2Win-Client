"use client";

import { Cookies, getCookie, removeCookie, setCookie } from "typescript-cookie";
import { QueryKey, QueryObserver } from "@tanstack/react-query";

import Axios from "@/utils/Axios";
import { IRoles } from "@/models/user.model";
import { queryClient } from "@/app/provider";

// TODO: After Implmenting Login Authentication, Test to see if queryClient is shared accross users
//THIS FILE HAS A CLIENT SIDE VERSION AND A SERVER SIDE VERSION
// Which means that there are two reactQueries, server side and client side

export const roleToMap = new Map([
  ["admin", IRoles.ADMIN],
  ["admin_reporter", IRoles.ADMIN_REPORTER],
  ["partner_admin", IRoles.PARTNER_ADMIN],
  ["partner_reporter", IRoles.PARTNER_REPORTER],
  ["bulk_initiator", IRoles.BULK_INITIATOR],
]);

// new Map();
export type AuthUserDto = {
  isAuthenticated: boolean;
  role: IRoles;
  email: string;
  publicName: string;
  schoolName: string;
  schoolEmail: string;
  profileImageUrl: string;
};
function newauthUserDto() {
  return {
    isAuthenticated: false,
    role: "user",
    email: "",
    publicName: "",
    schoolName: "",
    schoolEmail: "",
    profileImageUrl: "",
  };
}

// If you want to reimplement authService, as long as this interface is implmented, the rest of the app should work just fine.
type IauthService = {
  getAuthUser: () => AuthUserDto;
  subscirbeToChanges_AuthUser: (
    callbackfunc: (data: AuthUserDto) => void
  ) => () => void;
  isRole: (roles: IRoles[]) => boolean;
};

// Tanstack Query Keys
export enum AuthQueryKeys {
  AuthUser = "AuthUser",
  AuthUserRole = "AuthUserRole", //Depends on AuthUser
}


//Setting default values for AuthUserData
queryClient.ensureQueryData({
  queryKey: [AuthQueryKeys.AuthUser],
  queryFn: () => {
    return newauthUserDto();
  },
});

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export class AuthServiceTSQ implements IauthService {
  _queryClient = queryClient;
  private authUserDataObserver!: QueryObserver<any, any, any, any>;
  queryKeys = AuthQueryKeys;

  constructor() {
    if (typeof window !== "undefined") {
      this.authUserDataObserver = new QueryObserver(this._queryClient, {
        queryKey: [AuthQueryKeys.AuthUser] as QueryKey,
      });
      const access_token = getCookie("access_token");
      if (access_token) {
        // this.initiateUserAuthenticationPipeline(access_token);
      }
    }
  }

  public getAuthUser() {
    return this._queryClient.getQueryData([
      AuthQueryKeys.AuthUser,
    ]) as AuthUserDto;
  }

  public getUserRole() {
    const userData = this._queryClient.getQueryData([
      AuthQueryKeys.AuthUser,
    ]) as AuthUserDto;
    return userData.role;
  }

  public subscirbeToChanges_AuthUser(
    callbackfunc: (data: AuthUserDto) => void
  ) {
    const unsubfunc = this.authUserDataObserver.subscribe(
      callbackfunc as any //as any to prevent it from throwing errors
    );
    return unsubfunc;
  }

  public isRole(roles: IRoles[]) {
    return roles.includes(this.getAuthUser()?.role ?? IRoles.ADMIN); 
  }

  public login() {
    window.location.href = `${apiUrl}/api/authentication/google/login`;
  }

  // Apparently
  async getUserData() {
    return await Axios.get("/users/me").then(
      (res: any) => {
        // console.log("USER DATE : ", res.data);
        const userObject = {
          ...res.data,
          isAuthenticated: true,
          role: roleToMap.get(res.data.role ?? "user"),
        } as AuthUserDto;
        this._queryClient.setQueryData([AuthQueryKeys.AuthUser], userObject);
        return userObject;
      },
      (rej: any) => {
        // alert("Get User Data Failed : ");
        console.log("Error With getUserData : ", rej);
        return newauthUserDto();
      }
    );
  }

  public initiateUserAuthenticationPipeline(act: any) {
    // act stands for access_token, only call this function when you have and access token.

    if (!act) {
      // return immediately if no proper value has been passed to ACT
      return Promise.reject("Improper ACT");
    }

    // 1. Set access_token cookie
    // var inTwoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
    setCookie("access_token", act);

    // 2. Get user data
    return this.getUserData();
    // 3. Redirect based on userrole

    //TODO : redirect to appropriate homepage for user
  }

  public async logout() {
    // TODO : define logoout
    removeCookie("access_token");
    this._queryClient.setQueryData([AuthQueryKeys.AuthUser], newauthUserDto());
    await Promise.resolve(true);
    this._queryClient.invalidateQueries({
      queryKey: [AuthQueryKeys.AuthUser],
    });
  }

  public async refreshToken (failedRequest:any) {
    const refresh_token = Cookies.get("refresh_token");
    if (refresh_token !== undefined)
      return Axios
        .post("/auth/refresh", { refreshToken: refresh_token })
        .then((res) => {
          Cookies.set("access_token", res.data.accessToken);
          Cookies.set("refresh_token", res.data.refreshToken);
          Cookies.set("TrybzExpToken", res.data.expiresAt);

          failedRequest.response.config.headers["Authorization"] =
            "Bearer " + res.data;
          return Promise.resolve();
        });
  }
}

const authService = new AuthServiceTSQ();

export default authService;
