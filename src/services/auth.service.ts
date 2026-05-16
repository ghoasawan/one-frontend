import {  LoginRequest, RegisterRequest, AuthResponse } from "@/src/interfaces/index"
import {ApiClientInterface} from "@/src/services/ApiClientInterface"
import {authEndpoints} from "@/src/services/endpoints"
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";


export class AuthService {
  constructor(private http: ApiClientInterface) {}

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(authEndpoints.login, data);
    console.log("Login response:", response);
    return response;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(authEndpoints.register, data);
    return response;
  }

  async verifyEmail(token:string): Promise<AuthResponse>{
    const response= await this.http.post<AuthResponse>(authEndpoints.verifyEmail, {token:token})
    return response;
  }

  async resendVerification(email:string): Promise<AuthResponse>{
    const response= await this.http.post<AuthResponse>(authEndpoints.resendVerification, {email})
    return response;
  }
}
