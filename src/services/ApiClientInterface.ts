export interface ApiClientInterface {
  get<T = any>(url: string, config?: Record<string, any>): Promise<T>;
  post<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T>;
  put<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T>;
  delete<T = any>(url: string, config?: Record<string, any>): Promise<T>;
}
