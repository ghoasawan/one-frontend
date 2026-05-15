import { AxiosClient } from "@/src/services/axiosclient"
import { AuthService } from "@/src/services/auth.service"

const axios = new AxiosClient();

export const authService:AuthService = new AuthService(axios);
