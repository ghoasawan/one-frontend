import { ApiClientInterface } from "@/src/services/ApiClientInterface"
import axios, { AxiosInstance } from "axios"


export class AxiosClient implements ApiClientInterface {

    private client: AxiosInstance;

    constructor() {
        const baseURL=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/"
        this.client = axios.create({baseURL, withCredentials:true});
    }

    async get<T = any>(url: string, config?: Record<string, any>): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    async post<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }

    async put<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        return response.data;
    }

    async patch<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T> {
        const response = await this.client.patch<T>(url, data, config);
        return response.data;
    }

    async delete<T = any>(url: string, config?: Record<string, any>): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        return response.data;
    }
}
