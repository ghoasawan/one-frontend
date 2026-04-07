import {  LoginRequest, RegisterRequest, AuthResponse } from "@/src/interfaces/index"
import {ApiClientInterface} from "@/src/services/ApiClientInterface"
import {authEndpoints} from "@/src/services/endpoints"


export class AuthService {
  constructor(private http: ApiClientInterface) {}

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(authEndpoints.login, data);
    return response;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(authEndpoints.register, data);
    return response;
  }
}
