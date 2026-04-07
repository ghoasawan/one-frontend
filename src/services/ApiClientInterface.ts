export interface ApiClientInterface {
  /**
   * Makes a GET request
   * @param url - The endpoint URL
   * @param config - Optional axios request config
   * @returns Promise resolving to the response data
   */
  get<T = any>(url: string, config?: Record<string, any>): Promise<T>;

  /**
   * Makes a POST request
   * @param url - The endpoint URL
   * @param data - The request body data
   * @param config - Optional axios request config
   * @returns Promise resolving to the response data
   */
  post<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T>;

  /**
   * Makes a PUT request
   * @param url - The endpoint URL
   * @param data - The request body data
   * @param config - Optional axios request config
   * @returns Promise resolving to the response data
   */
  put<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T>;

  /**
   * Makes a PATCH request
   * @param url - The endpoint URL
   * @param data - The request body data
   * @param config - Optional axios request config
   * @returns Promise resolving to the response data
   */
  patch<T = any>(url: string, data?: any, config?: Record<string, any>): Promise<T>;

  /**
   * Makes a DELETE request
   * @param url - The endpoint URL
   * @param config - Optional axios request config
   * @returns Promise resolving to the response data
   */
  delete<T = any>(url: string, config?: Record<string, any>): Promise<T>;
}
