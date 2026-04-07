import { AxiosClient } from "@/src/services/axiosclient"
import { AuthService } from "@/src/services/auth.service"

// ==================== API Client Interface ====================

// ==================== API Endpoints ====================

export const authEndpoints = {
  login: "/api/auth/login",
  register: "/api/auth/register"
}

// ==================== Service Instances ====================

const axios = new AxiosClient();

export const authService = new AuthService(axios);
